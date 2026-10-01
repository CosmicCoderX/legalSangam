import { Route, Routes } from 'react-router-dom'
import { GuestRoute, ProtectedRoute, RoleRoute } from './routes/guards'
import Landing from './pages/Landing'
import AuthPage from './pages/AuthPage'
import ClientDashboard from './pages/Dashboard/ClientDashboard'
import AdvocateDashboard from './pages/Dashboard/AdvocateDashboard'
import AdminDashboard from './pages/Dashboard/AdminDashboard'
import Advocates from './pages/Dashboard/Advocates'
import AdvocateProfile from './pages/Dashboard/AdvocateProfile'
import Placeholder from './pages/Dashboard/Placeholder'
import NotFound from './pages/NotFound'
import Documents from './pages/Dashboard/Documents'
import Availability from './pages/Dashboard/Availability'
import News from './pages/Dashboard/News'
import AskCounsel from './pages/Dashboard/AskCounsel'
import Bookings from './pages/Dashboard/Bookings'
import Favorites from './pages/Dashboard/Favorites'
import Profile from './pages/Dashboard/Profile'
import LegalHelpMap from './pages/Dashboard/LegalHelpMap'
import AdvocateBookings from './pages/Dashboard/AdvocateBookings'
import AdvocateClients from './pages/Dashboard/AdvocateClients'
import AdvocateProfileEditor from './pages/Dashboard/AdvocateProfileEditor'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<GuestRoute><AuthPage /></GuestRoute>} />
      <Route path="/signup" element={<GuestRoute><AuthPage signup /></GuestRoute>} />
      
      <Route element={<ProtectedRoute />}>
        {/* Client Routes */}
        <Route element={<RoleRoute role="client" />}>
          <Route path="/dashboard" element={<ClientDashboard />} />
          <Route path="/dashboard/advocates" element={<Advocates />} />
          <Route path="/find-legal-help" element={<LegalHelpMap />} />
          <Route path="/dashboard/advocates/:id" element={<AdvocateProfile />} />
          <Route path="/dashboard/documents" element={<Documents />} />
          <Route path="/dashboard/news" element={<News />} />
          <Route path="/dashboard/askcounsel" element={<AskCounsel />} />
          <Route path="/dashboard/bookings" element={<Bookings />} />
          <Route path="/dashboard/favorites" element={<Favorites />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/*" element={<Placeholder role="client" title="Feature" />} />
        </Route>
        
        {/* Advocate Routes */}
        <Route element={<RoleRoute role="advocate" />}>
          <Route path="/advocate/dashboard" element={<AdvocateDashboard />} />
          <Route path="/advocate/profile" element={<AdvocateProfileEditor />} />
          <Route path="/advocate/availability" element={<Availability />} />
          <Route path="/advocate/bookings" element={<AdvocateBookings />} />
          <Route path="/advocate/clients" element={<AdvocateClients />} />
          <Route path="/advocate/*" element={<Placeholder role="advocate" title="Feature" />} />
        </Route>
        
        {/* Admin Routes */}
        <Route element={<RoleRoute role="admin" />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/*" element={<Placeholder role="admin" title="Administration" />} />
        </Route>
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
