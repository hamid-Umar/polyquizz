import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
export function ProtectedRoute() {
const { pseudo } = useContext(UserContext);
// Si le pseudo n'existe pas, redirection immédiate vers l'accueil "/"
    if (!pseudo) {
        return <Navigate to="/" replace />;
    }
// Si le pseudo existe, on autorise l'accès aux routes enfants
    return <Outlet />;
} 