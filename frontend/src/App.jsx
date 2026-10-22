import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Registro from './pages/Registro.jsx';
import Productos from './pages/Productos.jsx';
import RutaProtegida from './RutaProtegida.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route
        path="/"
        element={
          <RutaProtegida>
            <Productos />
          </RutaProtegida>
        }
      />
    </Routes>
  );
}