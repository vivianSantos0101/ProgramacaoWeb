import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { continenteApi, paisApi, cidadeApi } from '../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState({ continentes: 0, paises: 0, cidades: 0 });
  const [recentesContinentes, setRecentesContinentes] = useState<{ id: number; nome: string }[]>([]);
  const [recentesPaises, setRecentesPaises] = useState<{ id: number; nome: string }[]>([]);
  const [recentesCidades, setRecentesCidades] = useState<{ id: number; nome: string }[]>([]);
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

  useEffect(() => {
    Promise.all([
      continenteApi.listar(1, 1),
      paisApi.listar(1, 1),
      cidadeApi.listar(1, 1),
      continenteApi.listarTodos(),
      paisApi.listar(1, 5),
      cidadeApi.listar(1, 5),
    ]).then(([c, p, cd, allCont, recentP, recentCd]) => {
      setStats({
        continentes: c.data.total,
        paises: p.data.total,
        cidades: cd.data.total,
      });
      setRecentesContinentes(allCont.data.slice(0, 5));
      setRecentesPaises(recentP.data.data.map((item: any) => ({ id: item.id, nome: item.nome })));
      setRecentesCidades(recentCd.data.data.map((item: any) => ({ id: item.id, nome: item.nome })));
    }).catch(() => {});
  }, []);

  return (
    <div className="page">
      <div className="welcome-section">
        <h1>Olá, {usuario.nome || 'Usuário'}</h1>
        <p>Bem-vindo ao painel de gerenciamento geográfico.</p>
      </div>

      <div className="stats-grid">
        <Link to="/continentes" className="stat-card">
          <div className="stat-icon emerald">C</div>
          <div className="stat-label">Continentes</div>
          <div className="stat-value">{stats.continentes}</div>
          <span className="stat-link">Gerenciar</span>
        </Link>

        <Link to="/paises" className="stat-card">
          <div className="stat-icon amber">P</div>
          <div className="stat-label">Países</div>
          <div className="stat-value">{stats.paises}</div>
          <span className="stat-link">Gerenciar</span>
        </Link>

        <Link to="/cidades" className="stat-card">
          <div className="stat-icon blue">Ci</div>
          <div className="stat-label">Cidades</div>
          <div className="stat-value">{stats.cidades}</div>
          <span className="stat-link">Gerenciar</span>
        </Link>
      </div>

      <div className="recents-grid">
        <div className="card">
          <h3>Continentes cadastrados</h3>
          {recentesContinentes.length === 0 ? (
            <p className="text-muted">Nenhum registro encontrado</p>
          ) : (
            <ul className="recent-list">
              {recentesContinentes.map((item) => (
                <li key={item.id}>{item.nome}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="card">
          <h3>Países recentes</h3>
          {recentesPaises.length === 0 ? (
            <p className="text-muted">Nenhum registro encontrado</p>
          ) : (
            <ul className="recent-list">
              {recentesPaises.map((item) => (
                <li key={item.id}>{item.nome}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="card">
          <h3>Cidades recentes</h3>
          {recentesCidades.length === 0 ? (
            <p className="text-muted">Nenhum registro encontrado</p>
          ) : (
            <ul className="recent-list">
              {recentesCidades.map((item) => (
                <li key={item.id}>{item.nome}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
