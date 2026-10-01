-- Keep advocate/client booking state authoritative in the shared bookings table.
alter type public.booking_status add value if not exists 'rejected';
create unique index if not exists bookings_active_advocate_slot
  on public.bookings(advocate_id, date, start_time)
  where booking_status in ('pending', 'confirmed');

-- Notifications are generated in the database so an advocate never needs client write access.
create or replace function public.notify_booking_status_change() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if tg_op = 'INSERT' then
    insert into notifications(user_id,type,title,message) values
      (new.advocate_id, 'booking', 'New consultation request', 'A client has requested a consultation on ' || new.date || ' at ' || new.start_time);
  elsif old.booking_status is distinct from new.booking_status then
    insert into notifications(user_id,type,title,message) values
      (new.client_id, 'booking', 'Consultation status updated', 'Your consultation request is now ' || new.booking_status || '.');
  end if;
  return new;
end $$;
drop trigger if exists booking_status_notifications on public.bookings;
create trigger booking_status_notifications after insert or update of booking_status on public.bookings
for each row execute function public.notify_booking_status_change();
