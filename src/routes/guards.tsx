import type { ReactNode } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'; import { dashboardFor } from '../services/userService'; import { Loading } from '../components/ui'; import type { Role } from '../types/models'
export function ProtectedRoute(){const{user,loading}=useAuth();const loc=useLocation();if(loading)return <Loading/>;return user?<Outlet/>:<Navigate to="/login" replace state={{from:loc.pathname}}/>}
export function RoleRoute({role}:{role:Role}){const{profile,loading}=useAuth();if(loading)return <Loading/>;if(!profile)return <Navigate to="/login" replace/>;return profile.role===role?<Outlet/>:<Navigate to={dashboardFor(profile.role)} replace/>}
export function GuestRoute({children}:{children:ReactNode}){const{profile,loading}=useAuth();if(loading)return <Loading/>;return profile?<Navigate to={dashboardFor(profile.role)}/>:<>{children}</>}
