import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { login, register } from '../services/authService'
import { createUserProfile, dashboardFor } from '../services/userService'
import { Brand } from '../components/layout'
import { ErrorMessage } from '../components/ui'
import { Eye, EyeOff, Scale } from 'lucide-react'
import type { Role } from '../types/models'

export default function AuthPage({ signup = false }: { signup?: boolean }) {
  const navigate = useNavigate()
  const { refreshProfile } = useAuth()
  const [role, setRole] = useState<Role>('client')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const email = String(f.get('email'))
    const password = String(f.get('password'))
    
    if (signup && password !== String(f.get('confirm'))) {
      setError('Passwords do not match.')
      return
    }
    
    setBusy(true)
    setError('')
    
    try {
      if (signup) {
        const name = String(f.get('name'))
        const { data, error: signUpError } = await register(email, password, { name, role, phone: role === 'advocate' ? String(f.get('phone')) : '' })
        if (signUpError || !data.user) throw signUpError ?? new Error('signup-failed')
        
        // If no session is returned, email confirmation is required
        if (!data.session) {
          setError('Please check your email to confirm your account. You will be able to complete your profile after logging in.')
          return
        }

        await createUserProfile({
          uid: data.user.id,
          name,
          email,
          role,
          ...(role === 'advocate' ? { phone: String(f.get('phone')) } : {})
        })
        await refreshProfile()
        navigate(dashboardFor(role))
      } else {
        const { data, error: loginError } = await login(email, password)
        if (loginError || !data.user) throw loginError ?? new Error('invalid-credential')
        const { getUserProfile, createUserProfile: createProfileBackup } = await import('../services/userService')
        let p = await getUserProfile(data.user.id)
        
        // If profile is missing but user is logged in (happens if they confirmed email and log in for the first time)
        if (!p) {
          const u_name = data.user.user_metadata?.name || 'User'
          const u_role = data.user.user_metadata?.role || 'client'
          const u_phone = data.user.user_metadata?.phone || ''
          await createProfileBackup({
            uid: data.user.id,
            name: u_name,
            email: data.user.email!,
            role: u_role,
            ...(u_role === 'advocate' && u_phone ? { phone: u_phone } : {})
          })
          p = await getUserProfile(data.user.id)
        }

        if (!p) throw new Error('profile-missing')
        await refreshProfile()
        navigate(dashboardFor(p.role))
      }
    } catch (err: any) {
      console.error('Auth error:', err)
      setError(
        err?.code === 'profile-missing' 
          ? 'This account needs an administrator to restore its profile.' 
          : err?.message || 'Something went wrong. Please try again.'
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-mist">
      {/* Left side - Form */}
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          <header className="mb-10">
            <Brand />
          </header>
          
          <div className="card shadow-lg shadow-slate-200/50 p-8 border-slate-100">
            <p className="eyebrow">{signup ? 'Join LegalSangam' : 'Welcome back'}</p>
            <h1 className="mt-3 text-3xl font-bold text-ink">
              {signup ? 'Create your account' : 'Sign in to your account'}
            </h1>
            
            <form onSubmit={submit} className="mt-8">
              {signup && (
                <fieldset className="mb-6">
                  <legend className="text-sm font-semibold text-slate-700">I am a:</legend>
                  <div className="mt-3 grid grid-cols-2 gap-4">
                    {(['client', 'advocate'] as Role[]).slice(0, 2).map(r => (
                      <button 
                        type="button" 
                        onClick={() => setRole(r)} 
                        className={`relative rounded-xl border p-4 text-sm font-semibold capitalize transition-all duration-200 ${
                          role === r 
                            ? 'border-brand bg-brand/5 text-brand shadow-sm ring-1 ring-brand' 
                            : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'
                        }`} 
                        key={r}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}
              
              <div className="grid gap-5">
                {signup && (
                  <label className="text-sm font-semibold text-slate-700">
                    Full name
                    <input required name="name" className="input mt-2" placeholder="Jane Doe" />
                  </label>
                )}
                
                <label className="text-sm font-semibold text-slate-700">
                  Email
                  <input required name="email" type="email" autoComplete="email" className="input mt-2" placeholder="jane@example.com" />
                </label>
                
                {signup && role === 'advocate' && (
                  <label className="text-sm font-semibold text-slate-700">
                    Phone number
                    <input required name="phone" type="tel" className="input mt-2" placeholder="+91 XXXXX XXXXX" />
                  </label>
                )}
                
                <label className="text-sm font-semibold text-slate-700 relative">
                  Password
                  <div className="relative">
                    <input 
                      required 
                      name="password" 
                      minLength={6} 
                      type={showPassword ? 'text' : 'password'} 
                      autoComplete={signup ? 'new-password' : 'current-password'} 
                      className="input mt-2 pr-10" 
                      placeholder="••••••••"
                    />
                    <button 
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-ink mt-1"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </label>
                
                {signup && (
                  <label className="text-sm font-semibold text-slate-700 relative">
                    Confirm password
                    <div className="relative">
                      <input 
                        required 
                        name="confirm" 
                        minLength={6} 
                        type={showPassword ? 'text' : 'password'} 
                        className="input mt-2 pr-10" 
                        placeholder="••••••••"
                      />
                    </div>
                  </label>
                )}
              </div>
              
              {error && <ErrorMessage>{error}</ErrorMessage>}
              
              <button disabled={busy} className="btn-primary mt-8 w-full py-3.5 text-base shadow-lg shadow-brand/20 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none">
                {busy ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                    Please wait...
                  </span>
                ) : signup ? 'Create account' : 'Sign in'}
              </button>
            </form>
            
            <p className="mt-8 text-center text-sm font-medium text-slate-600">
              {signup ? 'Already have an account?' : 'New to LegalSangam?'} {' '}
              <Link className="text-brand hover:underline" to={signup ? '/login' : '/signup'}>
                {signup ? 'Sign in instead' : 'Create an account'}
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      {/* Right side - Image/Illustration */}
      <div className="hidden lg:flex w-1/2 relative bg-ink overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-[#0d1a3f] to-brand opacity-90"></div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand rounded-full mix-blend-screen filter blur-[100px] opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>
        
        <div className="relative z-10 w-full max-w-lg">
          <div className="glass-panel-dark p-10 backdrop-blur-xl border-white/10 shadow-2xl">
            <span className="grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-gold to-amber-600 text-white shadow-lg mb-8">
              <Scale size={32} />
            </span>
            <h2 className="text-4xl font-bold text-white leading-tight mb-4">
              Your Legal Journey, <br/>Simplified.
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              Connect with experienced advocates, manage your legal documents, and get the guidance you need in a secure environment.
            </p>
            
            <div className="mt-12 flex gap-4">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="size-12 rounded-full border-2 border-ink bg-slate-800 relative overflow-hidden flex items-center justify-center">
                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i}&backgroundColor=transparent`} alt={`User ${i}`} className="w-10 h-10 object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-white font-bold text-sm">Join 1,000+ users</span>
                <span className="text-slate-400 text-xs">finding the right legal help</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
