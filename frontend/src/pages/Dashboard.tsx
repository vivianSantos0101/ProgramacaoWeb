import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { continenteApi, paisApi, cidadeApi } from '../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState({ continentes: 0, paises: 0, cidades: 0 });
  const [recentes, setRecentes] = useState<{ label: string; items: { id: number; nome: string }[] }[]>([]);

  useEffect(() => {
    Promise.all([
      continenteApi.listar(1, 1),
      paisApi.listar(1, 1),
      cidadeApi.listar(1, 1),
      continenteApi.listarTodos(),
    ]).then(([c, p, cd, all]) => {
      setStats({
        continentes: c.data.total,
        paises: p.data.total,
        cidades: cd.data.total,
      });
      setRecentes([
        { label: 'Continentes', items: all.data.slice(0, 5) },
      ]);
    });
  }, []);

  return (
    <div className="page">
      <div className="breadcrumb"><a href="/">In&iacute;cio</a> <span>/</span> <span>Dashboard</span></div>
      <h1>Dashboard</h1>

      <div className="stats-grid">
        <Link to="/continentes" className="stat-card">
          <div className="stat-label">Continentes</div>
          <div className="stat-value">{stats.continentes}</div>
          <span className="stat-link">Gerenciar &rarr;</span>
        </Link>

        <Link to="/paises" className="stat-card">
          <div className="stat-label">Pa&iacute;ses</div>
          <div className="stat-value">{stats.paises}</div>
          <span className="stat-link">Gerenciar &rarr;</span>
        </Link>

        <Link to="/cidades" className="stat-card">
          <div className="stat-label">Cidades</div>
          <div className="stat-value">{stats.cidades}</div>
          <span className="stat-link">Gerenciar &rarr;</span>
        </Link>
      </div>

      {recentes.map((r) => (
        <div key={r.label} className="card">
          <h3>{r.label}</h3>
          {r.items.length === 0 ? (
            <p className="text-muted">Nenhum registro encontrado</p>
          ) : (
            <ul className="recent-list">
              {r.items.map((item) => (
                <li key={item.id}>{item.nome}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
