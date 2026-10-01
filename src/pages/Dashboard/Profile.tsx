import { useEffect, useState, useRef } from "react";
import { DashboardLayout } from "../../components/layout";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../lib/supabase";
import { ErrorMessage } from "../../components/ui";
import { Camera, User, Mail, Phone, ShieldCheck } from "lucide-react";

export default function Profile() {
  const { user, profile, refreshProfile } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    photo_url: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        phone: profile.phone || "",
        photo_url: profile.photo_url || "",
      });
    }
  }, [profile]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError("File is too large. Please select an image under 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo_url: reader.result as string }));
        setError("");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    setError("");
    setSuccess(false);
    
    try {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          name: formData.name,
          phone: formData.phone,
          photo_url: formData.photo_url,
        })
        .eq('id', user.id);
        
      if (updateError) throw updateError;
      
      await refreshProfile(); // <--- Update the header/AuthContext immediately!
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout role="client">
      <div className="mb-8">
        <p className="eyebrow">Settings</p>
        <h1 className="mt-1 text-3xl font-bold text-ink">My Profile</h1>
        <p className="mt-2 text-slate-500">Manage your personal information and display picture.</p>
      </div>
      
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Main Profile Form */}
        <div className="card p-6 sm:p-8 relative overflow-hidden bg-white shadow-xl shadow-slate-200/40 border border-slate-100">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-brand to-indigo-600 opacity-10 pointer-events-none"></div>
          
          <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
            
            {/* Avatar Section */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-slate-100">
              <div className="relative group">
                <div className="size-28 sm:size-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-slate-100">
                  {formData.photo_url ? (
                    <img src={formData.photo_url} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-50">
                      <User size={48} />
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-1 right-1 size-10 bg-brand text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:bg-brand/90 transition-all border-2 border-white"
                  title="Change picture"
                >
                  <Camera size={18} />
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handlePhotoUpload} 
                  accept="image/png, image/jpeg, image/webp" 
                  className="hidden" 
                />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-bold text-ink">{formData.name || 'Your Name'}</h3>
                <p className="text-sm font-medium text-slate-500 capitalize">{profile?.role || 'User'}</p>
                <div className="mt-3 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                  <ShieldCheck size={14} /> Account Active
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <User size={18} />
                  </div>
                  <input 
                    type="text" 
                    id="name" 
                    value={formData.name} 
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-field pl-10 h-12 text-base shadow-sm focus:shadow-md transition-shadow"
                    required
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
              
              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail size={18} />
                  </div>
                  <input 
                    type="email" 
                    id="email" 
                    value={user?.email || ""} 
                    disabled 
                    className="w-full rounded-xl border border-slate-200 px-4 py-2 pl-10 h-12 bg-slate-50 text-slate-500 cursor-not-allowed focus:outline-none"
                  />
                </div>
                <p className="mt-2 text-xs font-medium text-slate-500">Your email address cannot be changed.</p>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="phone" className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Phone size={18} />
                  </div>
                  <input 
                    type="tel" 
                    id="phone" 
                    value={formData.phone} 
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="input-field pl-10 h-12 text-base shadow-sm focus:shadow-md transition-shadow"
                    placeholder="+91 "
                  />
                </div>
              </div>
            </div>
            
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-sm shadow-sm flex items-center gap-3 animate-in fade-in zoom-in-95">
                <ShieldCheck size={20} className="text-emerald-500" />
                Profile updated successfully! Refresh to see changes.
              </div>
            )}
            
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button 
                type="submit" 
                disabled={loading}
                className="btn-primary px-8 py-3.5 text-base shadow-lg shadow-brand/20 disabled:opacity-70 disabled:shadow-none transition-all hover:-translate-y-0.5"
              >
                {loading ? 'Saving Changes...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar Info Card */}
        <div className="card p-6 h-fit bg-gradient-to-b from-slate-50 to-white border border-slate-200 shadow-sm">
          <h3 className="font-bold text-ink mb-4">Profile Tips</h3>
          <ul className="space-y-4 text-sm font-medium text-slate-600">
            <li className="flex gap-3">
              <span className="grid size-6 place-items-center rounded-full bg-brand/10 text-brand shrink-0">1</span>
              <span>Use a clear, professional photo for your display picture.</span>
            </li>
            <li className="flex gap-3">
              <span className="grid size-6 place-items-center rounded-full bg-brand/10 text-brand shrink-0">2</span>
              <span>Ensure your phone number includes the country code (e.g. +91).</span>
            </li>
            <li className="flex gap-3">
              <span className="grid size-6 place-items-center rounded-full bg-brand/10 text-brand shrink-0">3</span>
              <span>Keep your name updated to match your legal documents.</span>
            </li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
