import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registro from './pages/Registro';
import Login from './pages/Login';
import MainLayout from './layouts/MainLayout';
import AnexoIIDigital from './pages/AnexoIIDigital';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* Rutas dentro del layout principal */}
        <Route path="/" element={<MainLayout />}>
          <Route path="anexoII" element={<AnexoIIDigital />} />
          {/* Agregá más rutas internas acá */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
