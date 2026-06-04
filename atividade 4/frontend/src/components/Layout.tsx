import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import GlobeBackground from './GlobeBackground';

export default function Layout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  const links = [
    { to: '/', label: 'Dashboard', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>' },
    { to: '/continentes', label: 'Continentes', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>' },
    { to: '/paises', label: 'Países', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22V4h8l2 4h6v10H8l-2-4z"/></svg>' },
    { to: '/cidades', label: 'Cidades', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M3 10h18M3 7l9-4 9 4"/><path d="M4 21V10h3v11"/><path d="M10 21V10h4v11"/><path d="M17 21V10h3v11"/></svg>' },
    { to: '/api-data', label: 'Dados de APIs', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>' },
  ];

  const renderIcon = (svg: string) => (
    <span className="nav-icon" dangerouslySetInnerHTML={{ __html: svg }} />
  );

  return (
    <div className="app-layout">
      <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? '✕' : '☰'}
      </button>

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">CM</div>
          <h2>CRUD Mundo</h2>
          <p className="sidebar-user">{usuario.nome || 'Usuário'}</p>
        </div>
        <nav className="sidebar-nav">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              {renderIcon(link.icon)}
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="btn btn-logout" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)} />}

      <GlobeBackground />

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
