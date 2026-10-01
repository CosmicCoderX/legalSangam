import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-mist p-6 text-center relative overflow-hidden">
      {/* Decorative bg */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-brand/5 to-gold/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      
      <div className="animate-in fade-in zoom-in-95 duration-500">
        <p className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-gold to-amber-600 drop-shadow-sm">404</p>
        <h1 className="mt-6 text-4xl font-bold text-ink tracking-tight">Page not found</h1>
        <p className="mt-4 text-lg text-slate-500 max-w-sm mx-auto">
          We couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <Link className="btn-primary mt-10 shadow-lg shadow-brand/20 px-8 py-3.5" to="/">
          Return Home
        </Link>
      </div>
    </div>
  )
}
