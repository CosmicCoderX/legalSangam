import { useEffect, useState, type ReactElement } from "react";
import { FileText, Trash2, Upload, X, Sparkles, Info, Eye, ListFilter } from "lucide-react";
import { DashboardLayout } from "../../components/layout";
import { EmptyState, ErrorMessage } from "../../components/ui";
import {
  documentUrl,
  getDocuments,
  removeDocument,
  uploadDocument,
} from "../../services/documentService";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../lib/supabase";
import type { LegalDocument } from "../../types/models";

interface SummarySection {
  title: string;
  content: string;
}

function parseSummary(text: string): SummarySection[] {
  // Strip disclaimer if the AI included it at the beginning
  const withoutDisclaimer = text.replace(/Disclaimer:.*?\n/i, '').trim();
  
  const parts = withoutDisclaimer.split(/###\s+/).filter(Boolean);
  return parts.map(part => {
    const lines = part.trim().split('\n');
    const title = lines[0].trim();
    const content = lines.slice(1).join('\n').trim();
    return { title, content };
  });
}

function renderContent(content: string) {
  if (!content || content.toLowerCase().includes('not clearly specified')) {
    return (
      <p className="text-slate-400 italic flex items-center gap-2 mt-2">
        <Info size={16}/> Not clearly specified in the document.
      </p>
    );
  }

  const lines = content.split('\n');
  let inList = false;
  const elements: ReactElement[] = [];
  let listItems: ReactElement[] = [];
  
  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      listItems.push(<li key={idx} className="mb-1.5">{trimmed.substring(2)}</li>);
      inList = true;
    } else {
      if (inList) {
        elements.push(<ul key={`ul-${idx}`} className="list-disc pl-5 mb-4 text-slate-700">{listItems}</ul>);
        listItems = [];
        inList = false;
      }
      if (trimmed) {
        elements.push(<p key={idx} className="mb-3 text-slate-700 leading-relaxed">{trimmed}</p>);
      }
    }
  });
  
  if (inList) {
    elements.push(<ul key={`ul-end`} className="list-disc pl-5 mb-4 text-slate-700">{listItems}</ul>);
  }
  
  return <div className="text-sm">{elements}</div>;
}

export default function Documents() {
  const { user } = useAuth();
  const [items, setItems] = useState<LegalDocument[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  
  const [summaryDoc, setSummaryDoc] = useState<LegalDocument | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState("");
  const [summaryMode, setSummaryMode] = useState<'condensed' | 'full'>('full');

  const refresh = () =>
    user &&
    getDocuments(user.id)
      .then(setItems)
      .catch(() => setError("Unable to load documents."));

  useEffect(() => {
    refresh();
  }, [user]);

  const upload = async (f?: File) => {
    if (!f || !user) return;
    setBusy(true);
    setError("");
    try {
      await uploadDocument(user.id, f);
      refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  };

  const summarize = async (doc: LegalDocument) => {
    setSummaryDoc(doc);
    setSummaryError("");
    
    if (doc.summaryStatus === 'completed' && doc.summaryContent) {
      return; // Already have it locally
    }

    setSummaryLoading(true);
    try {
      const res = await supabase.functions.invoke('summarize-document', {
        body: { documentId: doc.id }
      });
      
      const { data, error: fnError } = res;
      if (fnError) {
        let errMsg = fnError.message;
        if (fnError.context) {
          try { const body = await fnError.context.clone().json(); if (body.error) errMsg = body.error; } catch(e) {}
        }
        throw new Error(errMsg);
      }
      if (data?.error) throw new Error(data.error);

      setItems(prev => prev.map(d => d.id === doc.id ? { ...d, summaryStatus: 'completed', summaryContent: data.summary } : d));
      setSummaryDoc(prev => prev?.id === doc.id ? { ...prev, summaryStatus: 'completed', summaryContent: data.summary } : prev);
      
    } catch (e: any) {
      setSummaryError(e.message || "Failed to generate summary.");
    } finally {
      setSummaryLoading(false);
    }
  };

  let visibleSections: SummarySection[] = [];
  if (summaryDoc?.summaryContent) {
    const sections = parseSummary(summaryDoc.summaryContent);
    const CONDENSED_SECTIONS = ['Executive Summary', 'Main Legal Issues', 'Plain-English Explanation'];
    visibleSections = summaryMode === 'condensed' 
      ? sections.filter(s => CONDENSED_SECTIONS.includes(s.title))
      : sections;
  }

  return (
    <DashboardLayout role="client">
      <div className="mb-8">
        <p className="eyebrow">Private document vault</p><h1 className="mt-1 text-3xl font-bold text-ink tracking-tight">Summarize Document</h1>
        <p className="mt-2 text-slate-500">
          Your private document vault. Upload legal documents for safekeeping and instant AI summarization.
        </p>
      </div>

      <div className="mt-8 mb-10">
        <label className={`
          flex flex-col items-center justify-center w-full h-40 
          border-2 border-dashed rounded-2xl cursor-pointer
          transition-all duration-200
          ${busy ? 'bg-slate-50 border-slate-300 dark:bg-slate-800 dark:border-slate-700' : 'bg-gradient-to-br from-brand/10 via-white to-blue-50 dark:via-slate-900 dark:to-slate-900 border-brand/30 hover:bg-brand/10 hover:border-brand/50 shadow-sm hover:shadow-lg hover:shadow-brand/5'}
        `}>
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {busy ? (
              <div className="size-12 rounded-full border-4 border-brand/20 border-t-brand animate-spin mb-3"></div>
            ) : (
              <div className="bg-brand/10 text-brand p-3.5 rounded-full mb-4 shadow-sm">
                <Upload size={24} />
              </div>
            )}
            <p className="mb-1 text-sm font-bold text-ink">
              {busy ? "Uploading Document..." : "Click to upload a PDF"}
            </p>
            <p className="text-xs text-slate-500 font-medium">PDF only (Max 10 MB)</p>
          </div>
          <input
            disabled={busy}
            onChange={(e) => upload(e.target.files?.[0])}
            accept="application/pdf"
            className="sr-only"
            type="file"
          />
        </label>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <div className="space-y-4">
        {items.map((d) => (
          <article
            className="card flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 hover:border-brand/30 transition-colors"
            key={d.id}
          >
            <div className="flex items-start sm:items-center gap-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                <FileText size={24} />
              </div>
              <div>
                <p className="font-bold text-ink text-lg">{d.fileName}</p>
                <p className="text-sm font-medium text-slate-500 mt-1 flex items-center gap-2">
                  <span className="uppercase text-[10px] tracking-wider font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-600">PDF</span>
                  {(d.fileSize / 1024 / 1024).toFixed(1)} MB
                </p>
              </div>
            </div>
            
            <div className="flex gap-2 sm:gap-3 flex-wrap items-center">
              <button
                className="btn-outline py-2 px-4 text-sm bg-white hover:bg-slate-50 flex items-center gap-2"
                onClick={async () => window.open(await documentUrl(d.storagePath), "_blank", "noopener")}
              >
                <Eye size={16} /> View PDF
              </button>
              
              {d.summaryStatus === 'completed' ? (
                <button
                  className="btn-primary py-2 px-4 text-sm flex items-center gap-2 shadow-sm"
                  onClick={() => { setSummaryMode('full'); summarize(d); }}
                >
                  <ListFilter size={16} /> View Summary
                </button>
              ) : (
                <button
                  className="btn-primary py-2 px-4 text-sm flex items-center gap-2 shadow-sm bg-purple-600 hover:bg-purple-700 text-white border-purple-600"
                  onClick={() => summarize(d)}
                >
                  <Sparkles size={16} /> Summarize
                </button>
              )}
              
              <button
                aria-label="Delete document"
                className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-1"
                onClick={async () => {
                  if (confirm(`Delete ${d.fileName}?`)) {
                    await removeDocument(d);
                    refresh();
                  }
                }}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </article>
        ))}
        {!items.length && !busy && (
          <EmptyState title="No documents yet.">
            Upload a PDF above to start building your secure document vault.
          </EmptyState>
        )}
      </div>

      {summaryDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-50 rounded-2xl shadow-2xl w-full max-w-4xl max-h-full flex flex-col overflow-hidden my-auto border border-slate-200">
            {/* Header */}
            <div className="flex items-center justify-between p-5 sm:px-8 bg-white border-b border-slate-200 shrink-0">
              <div>
                <h3 className="text-xl font-black text-ink flex items-center gap-2.5 tracking-tight">
                  <div className="p-1.5 bg-purple-100 text-purple-600 rounded-lg"><Sparkles size={20} /></div> 
                  AI Legal Summary
                </h3>
                <p className="text-sm font-medium text-slate-500 mt-1.5 truncate max-w-md" title={summaryDoc.fileName}>
                  {summaryDoc.fileName}
                </p>
              </div>
              <div className="flex items-center gap-4">
                {summaryDoc.summaryContent && (
                  <div className="hidden sm:flex bg-slate-100 p-1 rounded-lg">
                    <button 
                      onClick={() => setSummaryMode('condensed')}
                      className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${summaryMode === 'condensed' ? 'bg-white shadow text-ink' : 'text-slate-500 hover:text-ink'}`}
                    >
                      Condensed
                    </button>
                    <button 
                      onClick={() => setSummaryMode('full')}
                      className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${summaryMode === 'full' ? 'bg-white shadow text-ink' : 'text-slate-500 hover:text-ink'}`}
                    >
                      Full Details
                    </button>
                  </div>
                )}
                <button onClick={() => setSummaryDoc(null)} className="p-2 text-slate-400 hover:text-ink hover:bg-slate-100 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>
            </div>
            
            {/* Content Area */}
            <div className="p-5 sm:p-8 overflow-y-auto flex-1">
              {summaryLoading ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="size-16 rounded-full border-4 border-purple-100 border-t-purple-600 animate-spin mb-6"></div>
                  <h4 className="text-2xl font-black text-ink tracking-tight">Analyzing your document...</h4>
                  <p className="text-slate-500 mt-3 font-medium max-w-sm mx-auto leading-relaxed">
                    This may take a few moments. We are extracting the key legal points, dates, and obligations.
                  </p>
                </div>
              ) : summaryError ? (
                <div className="py-16 text-center">
                  <div className="inline-flex size-16 rounded-full bg-red-50 text-red-600 items-center justify-center mb-5 border border-red-100">
                    <X size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-ink mb-2">We couldn't summarize this document.</h4>
                  <p className="text-slate-600 max-w-md mx-auto font-medium">{summaryError}</p>
                  <button onClick={() => summarize(summaryDoc)} className="btn-primary mt-8 shadow-sm">Try Again</button>
                </div>
              ) : summaryDoc.summaryContent ? (
                <div className="max-w-3xl mx-auto space-y-6 pb-6">
                  {/* Disclaimer Banner */}
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 sm:p-5 flex gap-4 shadow-sm">
                    <div className="text-amber-600 shrink-0 mt-0.5"><Info size={20} /></div>
                    <div>
                      <h4 className="text-sm font-bold text-amber-900 mb-1">Important Disclaimer</h4>
                      <p className="text-sm text-amber-800/90 leading-relaxed font-medium">
                        AI-generated summaries may contain errors or omissions. Always review the original document and consult a qualified legal professional before relying on its contents.
                      </p>
                    </div>
                  </div>

                  {/* Mobile Toggle (visible only on small screens) */}
                  <div className="sm:hidden flex bg-slate-200/50 p-1 rounded-xl mb-6">
                    <button 
                      onClick={() => setSummaryMode('condensed')}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${summaryMode === 'condensed' ? 'bg-white shadow text-ink' : 'text-slate-600'}`}
                    >
                      Condensed
                    </button>
                    <button 
                      onClick={() => setSummaryMode('full')}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${summaryMode === 'full' ? 'bg-white shadow text-ink' : 'text-slate-600'}`}
                    >
                      Full Details
                    </button>
                  </div>

                  {/* Sections */}
                  <div className="space-y-5">
                    {visibleSections.length > 0 ? (
                      visibleSections.map((sec, i) => (
                        <div key={i} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                          <div className="bg-slate-50/80 border-b border-slate-100 px-5 py-3.5">
                            <h4 className="font-bold text-ink flex items-center gap-2 tracking-tight">
                              {sec.title}
                            </h4>
                          </div>
                          <div className="p-5">
                            {renderContent(sec.content)}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-10 bg-white border border-slate-200 rounded-xl">
                        <p className="text-slate-500 font-medium">No key points extracted for this mode.</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
