import { useEffect, useState, FormEvent } from 'react';
import { paisApi, continenteApi, Pais, Continente } from '../services/api';

export default function Paises() {
  const [items, setItems] = useState<Pais[]>([]);
  const [total, setTotal] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [continentes, setContinentes] = useState<Continente[]>([]);
  const [filtroContinente, setFiltroContinente] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<Pais | null>(null);
  const [nome, setNome] = useState('');
  const [populacao, setPopulacao] = useState('');
  const [idiomaOficial, setIdiomaOficial] = useState('');
  const [moeda, setMoeda] = useState('');
  const [continenteId, setContinenteId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const carregar = async (p = 1) => {
    setLoading(true);
    try {
      const cId = filtroContinente ? parseInt(filtroContinente) : undefined;
      const res = await paisApi.listar(p, 10, cId);
      setItems(res.data.data);
      setTotal(res.data.total);
      setPagina(res.data.pagina);
      setTotalPaginas(res.data.totalPaginas);
    } catch { setError('Erro ao carregar'); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    continenteApi.listarTodos().then((res) => setContinentes(res.data));
  }, []);

  useEffect(() => { carregar(); }, [filtroContinente]);

  const openCreate = () => {
    setEditItem(null);
    setNome(''); setPopulacao(''); setIdiomaOficial(''); setMoeda(''); setContinenteId('');
    setShowModal(true); setError('');
  };

  const openEdit = (item: Pais) => {
    setEditItem(item);
    setNome(item.nome);
    setPopulacao(item.populacao?.toString() || '');
    setIdiomaOficial(item.idiomaOficial || '');
    setMoeda(item.moeda || '');
    setContinenteId(item.continenteId.toString());
    setShowModal(true); setError('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = { nome, populacao, idiomaOficial, moeda, continenteId: parseInt(continenteId) };
      if (editItem) {
        await paisApi.atualizar(editItem.id, data);
      } else {
        await paisApi.criar(data);
      }
      setShowModal(false);
      carregar(pagina);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao salvar');
    } finally { setLoading(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Excluir este país?')) return;
    try { await paisApi.excluir(id); carregar(pagina); }
    catch { setError('Erro ao excluir'); }
  };

  const formatNum = (n: string | null | undefined) => {
    if (!n) return '—';
    return parseInt(n).toLocaleString('pt-BR');
  };

  return (
    <div className="page">
      <div className="breadcrumb"><a href="/">In&iacute;cio</a> <span>/</span> <span>Pa&iacute;ses</span></div>
      <div className="page-header">
        <h1>Países</h1>
        <button className="btn btn-primary" onClick={openCreate}>+ Novo País</button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="filters">
        <select value={filtroContinente} onChange={(e) => setFiltroContinente(e.target.value)}>
          <option value="">Todos os continentes</option>
          {continentes.map((c) => (
            <option key={c.id} value={c.id}>{c.nome}</option>
          ))}
        </select>
      </div>

      <div className="table-card">
        {loading && items.length === 0 ? (
          <p className="text-muted">Carregando...</p>
        ) : items.length === 0 ? (
          <p className="text-muted">Nenhum país cadastrado.</p>
        ) : (
          <>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Continente</th>
                  <th>População</th>
                  <th>Idioma</th>
                  <th>Moeda</th>
                  <th>Cidades</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td><strong>{item.nome}</strong></td>
                    <td>{item.continente?.nome || '—'}</td>
                    <td>{formatNum(item.populacao)}</td>
                    <td>{item.idiomaOficial || '—'}</td>
                    <td>{item.moeda || '—'}</td>
                    <td>{item._count?.cidades ?? 0}</td>
                    <td className="actions">
                      <button className="btn btn-sm btn-edit" onClick={() => openEdit(item)}>Editar</button>
                      <button className="btn btn-sm btn-delete" onClick={() => handleDelete(item.id)}>Excluir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              <span>{total} registro(s)</span>
              <div className="pagination-btns">
                <button disabled={pagina <= 1} onClick={() => carregar(pagina - 1)}>Anterior</button>
                <span>{pagina} de {totalPaginas}</span>
                <button disabled={pagina >= totalPaginas} onClick={() => carregar(pagina + 1)}>Próxima</button>
              </div>
            </div>
          </>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editItem ? 'Editar País' : 'Novo País'}</h2>
            {error && <div className="alert alert-error">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nome *</label>
                <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex: Brasil" required />
              </div>
              <div className="form-group">
                <label>Continente *</label>
                <select value={continenteId} onChange={(e) => setContinenteId(e.target.value)} required>
                  <option value="">Selecione...</option>
                  {continentes.map((c) => (
                    <option key={c.id} value={c.id}>{c.nome}</option>
                  ))}
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>População</label>
                  <input type="number" value={populacao} onChange={(e) => setPopulacao(e.target.value)} placeholder="213000000" />
                </div>
                <div className="form-group">
                  <label>Moeda</label>
                  <input value={moeda} onChange={(e) => setMoeda(e.target.value)} placeholder="Real (BRL)" />
                </div>
              </div>
              <div className="form-group">
                <label>Idioma Oficial</label>
                <input value={idiomaOficial} onChange={(e) => setIdiomaOficial(e.target.value)} placeholder="Português" />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-cancel" onClick={() => setShowModal(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Salvando...' : 'Salvar'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
