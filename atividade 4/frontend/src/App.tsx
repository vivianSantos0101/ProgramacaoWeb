import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Continentes from './pages/Continentes';
import Paises from './pages/Paises';
import Cidades from './pages/Cidades';
import ApiData from './pages/ApiData';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import ToastContainer from './components/Toast';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/continentes" element={<Continentes />} />
            <Route path="/paises" element={<Paises />} />
            <Route path="/cidades" element={<Cidades />} />
            <Route path="/api-data" element={<ApiData />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
