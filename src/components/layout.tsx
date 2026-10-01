import type { ReactNode } from 'react'
import { LogOut, Menu, Scale, X, ChevronDown, User, Moon, Sun } from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { flushSync } from 'react-dom'
import { useAuth } from '../contexts/AuthContext'
import { logout } from '../services/authService'
import type { Role } from '../types/models'
import { Notifications } from './Notifications'

export function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('legalsangam-theme') === 'dark' || 
      (!('legalsangam-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  })
  
  useEffect(() => { 
    document.documentElement.classList.toggle('dark', darkMode); 
    localStorage.setItem('legalsangam-theme', darkMode ? 'dark' : 'light') 
  }, [darkMode])
  
  const toggleTheme = (event: React.MouseEvent) => {
    const isDark = !darkMode;
    
    if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDarkMode(isDark);
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setDarkMode(isDark);
      });
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`
      ];
      document.documentElement.animate(
        {
          clipPath: isDark ? [...clipPath].reverse() : clipPath,
        },
        {
          duration: 400,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          pseudoElement: isDark ? "::view-transition-old(root)" : "::view-transition-new(root)",
        }
      );
    });
  };

  return (
    <button 
      onClick={toggleTheme} 
      aria-label="Toggle dark mode" 
      className="group grid size-9 place-items-center rounded-xl text-slate-500 transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-brand active:scale-90"
    >
      <div className="relative size-[18px]">
        <Sun className={`absolute inset-0 transition-all duration-500 ${darkMode ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} size={18} />
        <Moon className={`absolute inset-0 transition-all duration-500 ${darkMode ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`} size={18} />
      </div>
    </button>
  )
}

const clientLinks = [
  ['Dashboard', '/dashboard'],
  ['Find Advocates', '/dashboard/advocates'],
  ['Find Legal Help', '/find-legal-help'],
  ['AskCounsel', '/dashboard/askcounsel'],
  ['Summarize Document', '/dashboard/documents'],
  ['News', '/dashboard/news'],
  ['My Bookings', '/dashboard/bookings'],
  ['Favorites', '/dashboard/favorites'],
  ['Profile', '/dashboard/profile']
]

const advocateLinks = [
  ['Dashboard', '/advocate/dashboard'],
  ['My Profile', '/advocate/profile'],
  ['Availability', '/advocate/availability'],
  ['Bookings', '/advocate/bookings'],
  ['Clients', '/advocate/clients'],
  ['Documents', '/advocate/documents'],
  ['Reviews', '/advocate/reviews'],
  ['Earnings', '/advocate/earnings'],
  ['Settings', '/advocate/settings']
]

const adminLinks = [
  ['Dashboard', '/admin/dashboard'],
  ['Users', '/admin/users'],
  ['Advocates', '/admin/advocates'],
  ['Verifications', '/admin/verifications'],
  ['Reports', '/admin/reports'],
  ['News', '/admin/news']
]

export function Brand({ className = "text-ink" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 font-bold text-xl tracking-tight ${className}`}>
      <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-ink to-brand text-white shadow-md shadow-brand/20">
        <Scale size={20} />
      </span>
      LegalSangam
    </Link>
  )
}

export function DashboardLayout({ role, children }: { role: Role; children: ReactNode }) {
  const links = role === 'client' ? clientLinks : role === 'advocate' ? advocateLinks : adminLinks
  const [open, setOpen] = useState(false)
  const { profile } = useAuth()
  const navigate = useNavigate()

  const leave = async () => {
    await logout()
    navigate('/')
  }

  const sidebar = (
    <aside className="flex h-full w-72 flex-col bg-ink p-6 text-white shadow-2xl">
      <div className="mb-10"><Brand className="text-white" /></div>
      <nav className="space-y-2 overflow-y-auto">
        {links.map(([label, path]) => (
          <NavLink key={path} onClick={() => setOpen(false)} to={path} end className={({ isActive }) => `block rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${isActive ? 'bg-brand text-white shadow-md shadow-brand/20' : 'text-slate-400 hover:bg-white/10 hover:text-white'}`}>
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto border-t border-white/10 pt-5">
        <button onClick={leave} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 transition-all duration-200 hover:bg-white/10 hover:text-white">
          <LogOut size={18} /> Log out
        </button>
      </div>
    </aside>
  )

  return (
    <div className="min-h-screen bg-mist">
      <div className={`fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out min-[900px]:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        {sidebar}
      </div>
      {open && <button aria-label="Close navigation" onClick={() => setOpen(false)} className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 min-[900px]:hidden" />}
      <main className="min-[900px]:ml-72 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200/60 bg-white/70 backdrop-blur-xl px-5 sm:px-8">
          <button aria-label="Open navigation" className="rounded-lg p-2 hover:bg-slate-100 min-[900px]:hidden" onClick={() => setOpen(true)}>
            <Menu size={24} />
          </button>
          <div className="hidden text-sm font-medium text-slate-500 min-[900px]:block">LegalSangam Workspace</div>
          <div className="flex items-center gap-5">
            <ThemeToggle />
            <Notifications />
            <div className="text-right flex items-center gap-3">
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-ink">{profile?.name ?? 'Account'}</p>
                <p className="text-xs capitalize text-slate-500">{role}</p>
              </div>
              {profile?.photo_url ? (
                <img src={profile.photo_url} alt="Profile" className="size-10 rounded-full object-cover shadow-sm border-2 border-white" />
              ) : (
                <div className="grid size-10 place-items-center rounded-full bg-brand/10 text-brand font-bold shadow-sm">
                  {profile?.name ? profile.name[0].toUpperCase() : role[0].toUpperCase()}
                </div>
              )}
            </div>
          </div>
        </header>
        <div className="container-page py-8 sm:py-10 flex-1">{children}</div>
      </main>
    </div>
  )
}

export function PublicNav() {
  const [open, setOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  const { user, profile } = useAuth()
  const navigate = useNavigate()
  
  const links = [
    ['Home', '/'],
    ['About', '/#about'],
    ['Services', '/#services'],
    ['How It Works', '/#how-it-works'],
    ['Contact', '/#contact']
  ]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const dashboardPath = profile?.role === 'client' ? '/dashboard' : (profile?.role === 'advocate' ? '/advocate/dashboard' : '/admin/dashboard')

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="mx-auto mt-4 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass-card flex h-18 items-center justify-between px-6 shadow-sm">
          <Brand />
          <nav className="hidden items-center gap-8 md:flex">
            {links.map(([n, p]) => (
              <a key={n} className="nav-link font-medium" href={p}>{n}</a>
            ))}
          </nav>
          
          <div className="hidden gap-4 md:flex items-center">
            <ThemeToggle />
            {!user ? (
              <>
                <Link className="btn-outline py-2.5 px-6 shadow-sm hover:shadow-md" to="/login">Login</Link>
                <Link className="btn-primary py-2.5 px-6" to="/signup">Sign Up</Link>
              </>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                >
                  {profile?.photo_url ? (
                    <img src={profile.photo_url} alt="Profile" className="size-9 rounded-full object-cover shadow-sm" />
                  ) : (
                    <div className="grid size-9 place-items-center rounded-full bg-brand/10 text-brand font-bold shadow-sm">
                      {profile?.name ? profile.name[0].toUpperCase() : <User size={18} />}
                    </div>
                  )}
                  <span className="text-sm font-bold text-ink max-w-[100px] truncate">
                    {profile?.name || 'Account'}
                  </span>
                  <ChevronDown size={16} className="text-slate-500" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl glass-card bg-white/95 backdrop-blur-xl p-2 shadow-xl border border-white/50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-3 py-2 border-b border-slate-100 mb-2">
                      <p className="text-sm font-bold text-ink truncate">{profile?.name}</p>
                      <p className="text-xs text-slate-500 capitalize">{profile?.role}</p>
                    </div>
                    
                    <Link to={dashboardPath} className="flex items-center px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand transition-colors">
                      Dashboard
                    </Link>
                    
                    {profile?.role === 'client' && (
                      <>
                        <Link to="/dashboard/bookings" className="flex items-center px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand transition-colors">
                          My Bookings
                        </Link>
                        <Link to="/dashboard/favorites" className="flex items-center px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand transition-colors">
                          Favorites
                        </Link>
                      </>
                    )}
                    
                    <Link to={`${dashboardPath.replace('/dashboard', '')}/profile`} className="flex items-center px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand transition-colors">
                      Profile Settings
                    </Link>
                    
                    <div className="h-px bg-slate-100 dark:bg-slate-800 my-1"></div>
                    
                    <button onClick={handleLogout} className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-slate-800 transition-colors">
                      Log out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button onClick={() => setOpen(!open)} className="text-ink flex items-center gap-2" aria-label="Toggle menu">
              {user && profile && !open && (
                <div className="grid size-8 place-items-center rounded-full bg-brand/10 text-brand font-bold shadow-sm mr-2">
                  {profile?.photo_url ? (
                    <img src={profile.photo_url} alt="Profile" className="size-8 rounded-full object-cover" />
                  ) : (
                    profile?.name ? profile.name[0].toUpperCase() : <User size={16} />
                  )}
                </div>
              )}
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {open && (
        <div className="absolute left-4 right-4 top-24 rounded-2xl glass-card p-6 shadow-xl md:hidden transition-all duration-300 origin-top animate-in fade-in zoom-in-95">
          {user && profile && (
            <div className="flex items-center gap-4 p-4 mb-4 rounded-xl bg-slate-50 border border-slate-100">
              {profile?.photo_url ? (
                <img src={profile.photo_url} alt="Profile" className="size-12 rounded-full object-cover shadow-sm" />
              ) : (
                <div className="grid size-12 place-items-center rounded-full bg-brand/10 text-brand font-bold shadow-sm text-lg">
                  {profile?.name ? profile.name[0].toUpperCase() : <User size={20} />}
                </div>
              )}
              <div>
                <p className="text-sm font-bold text-ink">{profile?.name}</p>
                <p className="text-xs text-slate-500 capitalize">{profile?.role}</p>
              </div>
            </div>
          )}
          
          {links.map(([n, p]) => (
            <a onClick={() => setOpen(false)} className="block py-3 font-medium text-ink border-b border-slate-100 last:border-0" key={n} href={p}>
              {n}
            </a>
          ))}
          
          <div className="mt-5 grid grid-cols-1 gap-3">
            {!user ? (
              <div className="grid grid-cols-2 gap-4">
                <Link className="btn-outline text-center" to="/login">Login</Link>
                <Link className="btn-primary text-center" to="/signup">Sign Up</Link>
              </div>
            ) : (
              <>
                <Link className="btn-primary w-full justify-center" to={dashboardPath}>Go to Dashboard</Link>
                <button onClick={handleLogout} className="btn-outline w-full justify-center text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300">
                  Log out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
