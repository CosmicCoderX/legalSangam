import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Upload,
  FileText,
  CheckCircle,
  AlertTriangle,
  Clock,
  Shield,
  Zap,
  X,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { db, storage } from "@/lib/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

const DocumentReview = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisResults, setAnalysisResults] = useState({
    score: 85,
    issues: [
      {
        type: "warning",
        message: "Missing witness signature on page 3",
        severity: "Medium",
      },
      {
        type: "error",
        message: "Date format inconsistency in clause 5.2",
        severity: "High",
      },
      {
        type: "info",
        message: "Consider adding force majeure clause",
        severity: "Low",
      },
    ],
    strengths: [
      "Clear terms and conditions",
      "Proper legal terminology used",
      "All parties clearly identified",
      "Jurisdiction clause present",
    ],
  });
  const { isLoggedIn, username } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateMockAnalysis = () => {
    const scores = [75, 85, 92, 68, 95];
    const score = scores[Math.floor(Math.random() * scores.length)];
    return {
      score,
      issues: [
        {
          type: "warning",
          message: "Missing witness signature on page 3",
          severity: "Medium",
        },
        {
          type: "error",
          message: "Date format inconsistency in clause 5.2",
          severity: "High",
        },
        {
          type: "info",
          message: "Consider adding force majeure clause",
          severity: "Low",
        },
      ],
      strengths: [
        "Clear terms and conditions",
        "Proper legal terminology used",
        "All parties clearly identified",
        "Jurisdiction clause present",
      ],
    };
  };

  const handleFileUpload = async (file: File) => {
    if (!isLoggedIn) {
      setError("Please sign in to upload documents.");
      navigate("/signin");
      return;
    }

    // Check file type and size
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a PDF, DOC, or DOCX file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      // 10MB
      setError("File size must be less than 10MB.");
      return;
    }

    setError(null);
    setIsAnalyzing(true);
    setUploadProgress(0);

    try {
      const storageRef = ref(storage, `documents/${username}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Upload error:", error);
          setError("Upload failed. Please try again.");
          setIsAnalyzing(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const newAnalysis = generateMockAnalysis();
          setAnalysisResults(newAnalysis);

          // Save to Firestore
          await addDoc(collection(db, "documents"), {
            userId: username,
            fileName: file.name,
            fileUrl: downloadURL,
            uploadDate: new Date().toISOString(),
            analysisScore: newAnalysis.score,
            issues: newAnalysis.issues,
            strengths: newAnalysis.strengths,
            createdAt: new Date(),
          });

          setIsAnalyzing(false);
          setAnalysisComplete(true);
          setUploadProgress(100);
        }
      );
    } catch (err) {
      console.error("Upload error:", err);
      setError("An error occurred during upload.");
      setIsAnalyzing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    if (files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">
            AI Document Review
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get instant legal document analysis powered by AI. Upload your
            contracts, agreements, or legal documents for comprehensive review.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 animate-slide-up">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Zap className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Instant Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Get results in under 60 seconds
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Shield className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Secure & Private</h3>
              <p className="text-sm text-muted-foreground">
                Your documents are encrypted and protected
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <CheckCircle className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Expert Verified</h3>
              <p className="text-sm text-muted-foreground">
                AI trained on verified legal precedents
              </p>
            </CardContent>
          </Card>
        </div>

        {error && (
          <Alert variant="destructive" className="max-w-2xl mx-auto">
            <X className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!isLoggedIn && !isAnalyzing && !analysisComplete && (
          <Card className="max-w-2xl mx-auto animate-fade-in">
            <CardHeader className="text-center">
              <CardTitle>Please Sign In</CardTitle>
              <CardDescription>
                You need to be logged in to upload and analyze documents.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button onClick={() => navigate("/signin")}>Go to Sign In</Button>
            </CardContent>
          </Card>
        )}

        {isLoggedIn && !isAnalyzing && !analysisComplete && (
          /* Upload Section */
          <Card className="max-w-2xl mx-auto animate-fade-in">
            <CardHeader>
              <CardTitle>Upload Document</CardTitle>
              <CardDescription>
                Supported formats: PDF, DOC, DOCX (Max size: 10MB)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center space-y-4 transition-all duration-300 ${
                  dragActive
                    ? "border-primary bg-primary/5 scale-105"
                    : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"
                }`}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={() => setDragActive(true)}
                onDragLeave={() => setDragActive(false)}
              >
                <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">
                    Drop your document here
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    or click to browse files
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileInput}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="cursor-pointer"
                >
                  Choose File
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {isAnalyzing && (
          /* Analysis Progress */
          <Card className="max-w-2xl mx-auto animate-scale-in">
            <CardContent className="pt-8 space-y-6">
              <div className="text-center">
                <Clock className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
                <h3 className="text-xl font-semibold mb-2">
                  Uploading & Analyzing...
                </h3>
                <p className="text-muted-foreground">
                  Your document is being uploaded and analyzed
                </p>
              </div>
              <div className="space-y-2">
                <Progress value={uploadProgress} className="h-3" />
                <p className="text-sm text-muted-foreground text-center">
                  {Math.round(uploadProgress)}% Complete
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {analysisComplete && (
          /* Analysis Results */
          <div className="space-y-6 animate-fade-in">
            {/* Overall Score */}
            <Card className="max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <div
                  className={`text-6xl font-bold mb-2 ${
                    analysisResults.score >= 80
                      ? "text-green-600"
                      : analysisResults.score >= 60
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {analysisResults.score}%
                </div>
                <CardTitle>Document Analysis Complete</CardTitle>
                <CardDescription>
                  Your document has been thoroughly analyzed for legal
                  compliance and potential issues
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Issues Found */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Issues & Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {analysisResults.issues.map((issue, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-4 rounded-lg bg-muted/50"
                  >
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        issue.type === "error"
                          ? "bg-red-500"
                          : issue.type === "warning"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                      }`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{issue.message}</p>
                        <Badge
                          variant={
                            issue.severity === "High"
                              ? "destructive"
                              : issue.severity === "Medium"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {issue.severity}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Strengths */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                  Document Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {analysisResults.strengths.map((strength, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 text-sm"
                    >
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>{strength}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex justify-center space-x-4">
              <Button
                onClick={() => {
                  setAnalysisComplete(false);
                  setUploadProgress(0);
                  setAnalysisResults(generateMockAnalysis());
                }}
              >
                Analyze Another Document
              </Button>
              <Button variant="outline">Download Report</Button>
              <Button variant="outline">Consult a Lawyer</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentReview;
