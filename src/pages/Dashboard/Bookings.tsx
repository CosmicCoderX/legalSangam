import { useEffect, useState } from "react";
import { DashboardLayout } from "../../components/layout";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../lib/supabase";
import { EmptyState, Loading, ErrorMessage } from "../../components/ui";
import { Video, Calendar as CalendarIcon, Clock, Trash2, MessageSquareText, X } from "lucide-react";
import type { Booking } from "../../types/models";

// Extended Booking type to include advocate details from the join
interface BookingWithAdvocate extends Booking {
  booking_status: Booking['bookingStatus'];
  consultation_fee: number;
  start_time: string;
  end_time: string;
  advocates: {
    name: string;
    photo_url?: string;
    specializations?: string[];
  }
}

export default function Bookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<BookingWithAdvocate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Feedback state
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [activeBookingId, setActiveBookingId] = useState<string | null>(null);
  const [feedbacks, setFeedbacks] = useState<Record<string, { status: string }>>({});

  useEffect(() => {
    if (!user) return;
    
    const fetchBookings = async () => {
      try {
        const { data, error: dbError } = await supabase
          .from('bookings')
          .select(`
            *,
            advocates (
              name,
              photo_url,
              specializations
            )
          `)
          .eq('client_id', user.id)
          .order('date', { ascending: false });
          
        if (dbError) throw dbError;
        setBookings(data as any || []);
      } catch (err: any) {
        setError(err.message || "Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookings();
  }, [user]);

  const removeBooking = async (id: string) => {
    if (!confirm("Are you sure you want to remove this past meeting?")) return;
    try {
      await supabase.from('bookings').delete().eq('id', id);
      setBookings(prev => prev.filter(b => b.id !== id));
    } catch (err) {
      console.error("Failed to delete booking", err);
    }
  };

  const handleFeedbackSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const status = fd.get('status') as string;
    if (activeBookingId && status) {
      setFeedbacks(prev => ({ ...prev, [activeBookingId]: { status } }));
    }
    setFeedbackModalOpen(false);
    setActiveBookingId(null);
  };

  const upcoming = bookings.filter(b => b.booking_status === 'pending' || b.booking_status === 'confirmed');
  const past = bookings.filter(b => b.booking_status === 'completed' || b.booking_status === 'cancelled');

  return (
    <DashboardLayout role="client">
      <div className="mb-8">
        <p className="eyebrow">Your schedule</p><h1 className="mt-1 text-3xl font-bold text-ink">My Bookings</h1>
        <p className="mt-2 text-slate-500">Manage your upcoming and past consultations.</p>
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : bookings.length === 0 ? (
        <EmptyState title="No bookings found">
          You haven't booked any consultations yet.
        </EmptyState>
      ) : (
        <div className="space-y-10">
          {upcoming.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-ink mb-4">Upcoming Consultations</h2>
              <div className="grid gap-4 xl:grid-cols-2">
                {upcoming.map(booking => (
                  <BookingCard 
                    key={booking.id} 
                    booking={booking} 
                    isUpcoming 
                    feedbackStatus={feedbacks[booking.id]?.status}
                    onOpenFeedback={() => { setActiveBookingId(booking.id); setFeedbackModalOpen(true); }}
                    onRemove={() => removeBooking(booking.id)}
                  />
                ))}
              </div>
            </section>
          )}

          {past.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-ink mb-4">Past Consultations</h2>
              <div className="grid gap-4 xl:grid-cols-2">
                {past.map(booking => (
                  <BookingCard 
                    key={booking.id} 
                    booking={booking} 
                    feedbackStatus={feedbacks[booking.id]?.status}
                    onOpenFeedback={() => { setActiveBookingId(booking.id); setFeedbackModalOpen(true); }}
                    onRemove={() => removeBooking(booking.id)}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* Feedback Modal */}
      {feedbackModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl relative animate-in zoom-in-95">
            <button onClick={() => setFeedbackModalOpen(false)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-ink hover:bg-slate-100 rounded-full transition-colors">
              <X size={20} />
            </button>
            <h2 className="text-2xl font-bold text-ink mb-2">Consultation Feedback</h2>
            <p className="text-sm text-slate-500 mb-6">Please provide feedback and update the status for this consultation.</p>
            
            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Name</label>
                  <input name="name" type="text" required className="input w-full" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Number</label>
                  <input name="number" type="tel" required className="input w-full" placeholder="+91 " />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Age</label>
                  <input name="age" type="number" required className="input w-full" placeholder="30" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">City</label>
                  <input name="city" type="text" required className="input w-full" placeholder="Delhi" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">State</label>
                  <input name="state" type="text" required className="input w-full" placeholder="Delhi" />
                </div>
              </div>
              
              <div className="pt-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Consultation Status</label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {['Unattended', 'Completed', 'In-process', 'Pending'].map((status) => (
                    <label key={status} className="flex items-center gap-2 cursor-pointer p-2 rounded-lg border border-slate-200 hover:bg-slate-50">
                      <input type="radio" name="status" value={status} required className="text-brand focus:ring-brand accent-brand" />
                      <span className="text-xs font-semibold text-slate-700">{status}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <button type="submit" className="btn-primary w-full mt-6 py-3">Submit Feedback</button>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

function BookingCard({ booking, isUpcoming = false, feedbackStatus, onOpenFeedback, onRemove }: { booking: BookingWithAdvocate, isUpcoming?: boolean, feedbackStatus?: string, onOpenFeedback: () => void, onRemove: () => void }) {
  const d = new Date(booking.date);
  const lawType = booking.advocates?.specializations?.[0] || 'General Law';
  
  // Determine status display
  let statusLabel: string = booking.booking_status;
  let statusColor = "bg-slate-100 text-slate-600";
  
  if (booking.booking_status === 'pending') { statusLabel = 'Pending'; statusColor = 'bg-amber-100 text-amber-700'; }
  if (booking.booking_status === 'confirmed') { statusLabel = 'In-progress'; statusColor = 'bg-blue-100 text-blue-700'; }
  if (booking.booking_status === 'completed') { statusLabel = 'Completed'; statusColor = 'bg-emerald-100 text-emerald-700'; }
  if (booking.booking_status === 'cancelled') { statusLabel = 'Cancelled'; statusColor = 'bg-red-100 text-red-700'; }

  // Override with feedback status if present
  if (feedbackStatus) {
    statusLabel = feedbackStatus;
    if (feedbackStatus === 'Unattended') statusColor = 'bg-red-100 text-red-700 border border-red-200';
    if (feedbackStatus === 'Completed') statusColor = 'bg-emerald-100 text-emerald-700 border border-emerald-200';
    if (feedbackStatus === 'In-process') statusColor = 'bg-blue-100 text-blue-700 border border-blue-200';
    if (feedbackStatus === 'Pending') statusColor = 'bg-amber-100 text-amber-700 border border-amber-200';
  }

  return (
    <div className={`card p-5 border-l-4 ${isUpcoming ? 'border-l-brand bg-gradient-to-br from-white to-blue-50/50' : 'border-l-slate-300'} flex flex-col`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-lg text-ink">{booking.advocates?.name || 'Advocate'}</h3>
            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-md">
              {lawType}
            </span>
          </div>
          <p className="text-sm text-slate-500 font-medium">₹{booking.consultation_fee} Consultation Fee</p>
        </div>
        
        {/* Status Badge / Button */}
        <button 
          onClick={onOpenFeedback}
          className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all hover:scale-105 shadow-sm capitalize ${statusColor}`}
          title="Click to update status and leave feedback"
        >
          {statusLabel}
        </button>
      </div>
      
      <div className="flex flex-wrap gap-3 text-sm font-medium text-slate-600 mb-6">
        <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
          <CalendarIcon size={16} className="text-brand" /> {d.toLocaleDateString('en-IN', { dateStyle: 'medium' })}
        </span>
        <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
          <Clock size={16} className="text-brand" /> {booking.start_time} - {booking.end_time}
        </span>
      </div>
      
      <div className="mt-auto pt-4 border-t border-slate-100 flex flex-wrap sm:flex-nowrap gap-3">
        {isUpcoming && (
          <a 
            href={`https://meet.jit.si/LegalSangam-${booking.id}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary py-2 text-sm flex-1 flex justify-center gap-2 shadow-md shadow-brand/20"
          >
            <Video size={16} /> Join Video Call
          </a>
        )}
        
        <button 
          onClick={onOpenFeedback} 
          className="btn-outline py-2 text-sm flex-1 flex justify-center gap-2"
        >
          <MessageSquareText size={16} /> Feedback
        </button>
        
        {!isUpcoming && (
          <button 
            onClick={onRemove} 
            className="btn-outline py-2 text-sm flex-1 flex justify-center gap-2 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
          >
            <Trash2 size={16} /> Remove
          </button>
        )}
      </div>
    </div>
  );
}
