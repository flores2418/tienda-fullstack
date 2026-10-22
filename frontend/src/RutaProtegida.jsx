import { Navigate } from 'react-router-dom';

export default function RutaProtegida({ children }) {
  const token = localStorage.getItem('token');
  const noHayToken = !token;

  if (noHayToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
}