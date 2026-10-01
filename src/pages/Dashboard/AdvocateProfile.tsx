import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, MapPin, Briefcase, Languages, GraduationCap, Clock, Heart, Calendar, Video } from 'lucide-react'
import { useEffect, useState } from 'react'
import { DashboardLayout } from '../../components/layout'
import { ErrorMessage, Loading } from '../../components/ui'
import { getAdvocate } from '../../services/advocateService'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'
import type { AdvocateProfile as Advocate } from '../../types/models'

function loadRazorpay() {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

const TIME_SLOTS = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

export default function AdvocateProfile() {
  const { id } = useParams()
  const { user, profile } = useAuth()
  const [a, setA] = useState<Advocate | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  
  // Booking state
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [successBookingId, setSuccessBookingId] = useState<string>('')
  
  // Favorite state
  const [isFavorite, setIsFavorite] = useState(false)

  const next7Days = Array.from({length: 7}).map((_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i)
    return d.toISOString().split('T')[0]
  })

  useEffect(() => {
    if (id) {
      getAdvocate(id).then(data => {
        if (!data) setError('Advocate not found')
        else {
          setA(data)
          const favs = JSON.parse(localStorage.getItem('fav_advocates') || '[]')
          setIsFavorite(favs.includes(data.id))
        }
      }).catch(() => setError('Failed to load profile.'))
      .finally(() => setLoading(false))
    }
  }, [id])

  const toggleFavorite = () => {
    if (!a) return
    const favs = JSON.parse(localStorage.getItem('fav_advocates') || '[]')
    if (favs.includes(a.id)) {
      const newFavs = favs.filter((fId: string) => fId !== a.id)
      localStorage.setItem('fav_advocates', JSON.stringify(newFavs))
      setIsFavorite(false)
    } else {
      favs.push(a.id)
      localStorage.setItem('fav_advocates', JSON.stringify(favs))
      setIsFavorite(true)
    }
  }

  const handleBooking = async () => {
    if (!a || !user) return
    if (!selectedDate || !selectedTime) {
      setError('Please select a date and time slot.')
      return
    }
    
    setBusy(true)
    setError('')
    setSuccessBookingId('')
    
    try {
      const isLoaded = await loadRazorpay()
      if (!isLoaded) throw new Error('Razorpay SDK failed to load. Are you online?')

      // Calculate end time (30 mins duration)
      const [h, m] = selectedTime.split(':').map(Number)
      const isHalf = m === 30
      const endH = isHalf ? h + 1 : h
      const endM = isHalf ? "00" : "30"
      const endTimeStr = `${String(endH).padStart(2, '0')}:${endM}`

      const res = await supabase.functions.invoke('create-order', {
        body: { advocateId: a.id, date: selectedDate, startTime: selectedTime, endTime: endTimeStr }
      })
      
      const { data, error: fnError } = res
      
      if (fnError) {
        let errMsg = fnError.message || 'Failed to create order'
        if (fnError.context) {
          try {
            const body = await fnError.context.clone().json()
            if (body.error) errMsg = body.error
          } catch(e) {}
        }
        throw new Error(errMsg)
      }
      if (data?.error) throw new Error(data.error)

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_mockkey123',
        amount: data.amount,
        currency: "INR",
        name: "LegalSangam",
        description: `Consultation with ${a.name}`,
        order_id: data.orderId,
        handler: async function (response: any) {
          try {
            const { data: vData, error: vError } = await supabase.functions.invoke('verify-payment', {
              body: {
                bookingId: data.bookingId,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature
              }
            })
            if (vError) {
              let errMsg = vError.message || 'Payment verification failed.'
              if (vError.context) {
                try {
                  const body = await vError.context.clone().json()
                  if (body.error) errMsg = body.error
                } catch(e) {}
              }
              throw new Error(errMsg)
            }
            if (vData?.error) throw new Error(vData.error)
            
            // Set success
            setSuccessBookingId(data.bookingId)
          } catch (e: any) {
            setError(e.message)
          }
        },
        prefill: {
          name: profile?.name || '',
          email: profile?.email || '',
          contact: profile?.phone || ''
        },
        theme: { color: "#2563eb" }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function () {
        setError('Payment was cancelled or failed.')
      });
      rzp.open();
    } catch (e: any) {
      setError(e.message)
    } finally {
      setBusy(false)
    }
  }
  
  return (
    <DashboardLayout role="client">
      <Link className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-brand transition-colors mb-6 group" to="/dashboard/advocates">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to search
      </Link>
      
      {loading ? <Loading /> : error && !a ? <ErrorMessage>{error}</ErrorMessage> : a && (
      <div className="card overflow-hidden p-0 border-slate-200/60 shadow-md">
        <div className="h-32 bg-gradient-to-r from-ink to-brand/80 relative">
          <button 
            onClick={toggleFavorite}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur rounded-full p-2 transition-colors text-white"
          >
            <Heart size={20} className={isFavorite ? "fill-white text-white" : ""} />
          </button>
        </div>
        
        <div className="px-6 sm:px-10 pb-10">
          <div className="flex flex-col gap-6 sm:flex-row relative">
            <div className="grid size-28 -mt-14 place-items-center rounded-3xl bg-white text-3xl font-bold text-brand shadow-xl border-4 border-white shrink-0 overflow-hidden relative">
              <img 
                src={a.photoUrl || `/advocates/photos/advocate-${a.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.webp`} 
                alt={a.name} 
                className="size-full object-cover relative z-10" 
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                  const fallback = (e.target as HTMLElement).nextElementSibling;
                  if (fallback) (fallback as HTMLElement).style.display = 'grid';
                }}
              />
              <div 
                className="absolute inset-0 size-full bg-brand/10 place-items-center z-0"
                style={{ display: 'none' }}
              >
                {a.name.split(' ').slice(-2).map(x => x[0]).join('')}
              </div>
            </div>
            
            <div className="flex-1 pt-2 sm:pt-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold text-ink tracking-tight">{a.name}</h1>
                    {a.rating && (
                      <span className="bg-amber-100 text-amber-800 text-sm font-bold px-2.5 py-0.5 rounded border border-amber-200">
                        ★ {a.rating} {a.reviews ? `(${a.reviews} reviews)` : ''}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm font-bold uppercase tracking-wide text-brand">{a.title ?? 'Advocate'} {a.isDemo && '· Demo profile'}</p>
                  <p className="mt-1.5 text-lg text-slate-500 font-medium">{(a.specializations ?? a.specialization ?? []).join(' · ')}</p>
                </div>
                <span className={`rounded-full px-4 py-1.5 text-xs font-bold border ${a.verificationStatus === 'verified' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                  {a.verificationStatus === 'verified' ? 'Verified' : 'Verification pending'}
                </span>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-6 text-sm font-medium text-slate-600">
                <span className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100"><Briefcase size={16} className="text-brand"/> {a.experienceYears ?? a.experience ?? 0} years experience</span>
                <span className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100"><MapPin size={16} className="text-brand"/> {a.address ?? `${a.city}, ${a.state}`}</span>
                {a.courts && <span className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100"><MapPin size={16} className="text-brand"/> {a.courts}</span>}
                <span className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100"><Clock size={16} className="text-brand"/> {a.availability === 'available-now' ? 'Available now' : 'Available today'}</span>
              </div>
              
              <div className="mt-10">
                <h3 className="text-lg font-bold text-ink mb-3">About</h3>
                <p className="leading-relaxed text-slate-600 whitespace-pre-line">
                  {a.bio || 'Profile information, detailed biography, and specific availability schedules will be completed by the advocate during the next platform phase. They specialize in providing comprehensive legal strategies with a client-first approach.'}
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <section className="rounded-xl bg-slate-50 p-5"><h3 className="font-bold text-ink">Practice areas</h3><p className="mt-2 text-sm leading-6 text-slate-600">{(a.specializations ?? a.specialization).join(' · ')}</p></section>
                <section className="rounded-xl bg-slate-50 p-5"><h3 className="font-bold text-ink">Bar enrollment</h3><p className="mt-2 text-sm leading-6 text-slate-600">{a.enrollment ?? 'Demo enrollment information'}</p></section>
              </div>
              
              <div className="mt-10 grid gap-6 sm:grid-cols-3 border-t border-slate-100 pt-8">
                <div className="flex gap-4">
                  <div className="size-10 rounded-full bg-blue-50 text-brand grid place-items-center shrink-0"><Languages size={20}/></div>
                  <div>
                    <p className="font-bold text-ink">Languages</p>
                    <p className="mt-1 text-sm text-slate-500">{(a.languages ?? ['English', 'Hindi']).join(', ')}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="size-10 rounded-full bg-amber-50 text-amber-600 grid place-items-center shrink-0"><Video size={20}/></div>
                  <div><p className="font-bold text-ink">Consultation</p><p className="mt-1 text-sm text-slate-500">{[a.consultationOnline && 'Online', a.consultationInPerson && 'In-person'].filter(Boolean).join(' · ')}</p></div>
                </div>
                <div className="flex gap-4">
                  <div className="size-10 rounded-full bg-green-50 text-green-600 grid place-items-center shrink-0"><span className="font-bold">₹</span></div>
                  <div>
                    <p className="font-bold text-ink">Consultation Fee</p>
                    <p className="mt-1 text-sm text-slate-500">{a.consultationFee ?? a.fee} / session</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="size-10 rounded-full bg-purple-50 text-purple-600 grid place-items-center shrink-0"><GraduationCap size={20}/></div>
                  <div>
                    <p className="font-bold text-ink">Education</p>
                    <p className="mt-1 text-sm text-slate-500">{(a.education ?? ['To be added']).join(', ')}</p>
                  </div>
                </div>
              </div>

              {!successBookingId ? (
                <>
                  <div className="mt-10 pt-8 border-t border-slate-100">
                    <h3 className="text-lg font-bold text-ink mb-4 flex items-center gap-2">
                      <Calendar className="text-brand" size={20} /> Select a Slot
                    </h3>
                    
                    <div className="mb-4">
                      <p className="text-sm font-medium text-slate-700 mb-2">Pick a Date:</p>
                      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {next7Days.map(dateStr => {
                          const d = new Date(dateStr)
                          const isSelected = selectedDate === dateStr
                          return (
                            <button
                              key={dateStr}
                              onClick={() => setSelectedDate(dateStr)}
                              className={`flex-shrink-0 flex flex-col items-center justify-center p-3 rounded-xl border ${isSelected ? 'bg-brand text-white border-brand' : 'bg-white border-slate-200 text-slate-600 hover:border-brand/50'}`}
                            >
                              <span className="text-xs uppercase font-bold">{d.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                              <span className="text-xl font-black">{d.getDate()}</span>
                              <span className="text-xs">{d.toLocaleDateString('en-US', { month: 'short' })}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {selectedDate && (
                      <div>
                        <p className="text-sm font-medium text-slate-700 mb-2">Pick a Time:</p>
                        <div className="flex flex-wrap gap-2">
                          {TIME_SLOTS.map(time => {
                            const isSelected = selectedTime === time
                            return (
                              <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold border ${isSelected ? 'bg-ink text-white border-ink' : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-ink/50'}`}
                              >
                                {time}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {error && <div className="mt-6"><ErrorMessage>{error}</ErrorMessage></div>}
                  
                  <div className="mt-8 flex flex-wrap gap-4 pt-6 border-t border-slate-100">
                    <button 
                      disabled={busy || !selectedDate || !selectedTime}
                      className="btn-primary flex-1 sm:flex-none shadow-lg shadow-brand/20 py-3.5 px-8 text-base disabled:opacity-70 disabled:shadow-none" 
                      onClick={handleBooking}
                    >
                      {busy ? 'Opening Payment...' : 'Book Consultation'}
                    </button>
                    <button className="btn-outline flex-1 sm:flex-none py-3.5 px-8 text-base" onClick={() => alert('Messaging will be enabled in Phase 2.')}>
                      Send Message
                    </button>
                  </div>
                </>
              ) : (
                <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-green-50 border border-green-200">
                  <h3 className="text-xl font-bold text-green-800 mb-2">Booking Confirmed!</h3>
                  <p className="text-green-700 mb-6">Your consultation with {a.name} is confirmed for {new Date(selectedDate).toLocaleDateString()} at {selectedTime}.</p>
                  
                  <div className="bg-white p-4 rounded-xl border border-green-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3 text-ink">
                      <div className="bg-brand/10 p-2 rounded-full text-brand"><Video size={24} /></div>
                      <div>
                        <p className="font-bold">Video Meeting Link</p>
                        <p className="text-sm text-slate-500">Join here at the scheduled time</p>
                      </div>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <a 
                        href={`https://meet.jit.si/LegalSangam-${successBookingId}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-primary flex-1 sm:flex-none py-2 px-4"
                      >
                        Join Now
                      </a>
                      <button 
                        onClick={() => alert("Added to calendar! (Simulation)")}
                        className="btn-outline flex-1 sm:flex-none py-2 px-4 bg-white"
                      >
                        Add to Calendar
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      )}
    </DashboardLayout>
  )
}
