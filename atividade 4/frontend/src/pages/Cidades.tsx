import { useEffect, useState, FormEvent } from 'react';
import { cidadeApi, paisApi, continenteApi, Cidade, Pais, Continente } from '../services/api';
import { showToast } from '../components/Toast';

export default function Cidades() {
  const [items, setItems] = useState<Cidade[]>([]);
  const [total, setTotal] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [continentes, setContinentes] = useState<Continente[]>([]);
  const [paises, setPaises] = useState<Pais[]>([]);
  const [filtroContinente, setFiltroContinente] = useState('');
  const [filtroPais, setFiltroPais] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<Cidade | null>(null);
  const [nome, setNome] = useState('');
  const [populacao, setPopulacao] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [paisId, setPaisId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Separate state for the modal's country list (loads ALL countries)
  const [modalPaises, setModalPaises] = useState<Pais[]>([]);

  const carregar = async (p = 1) => {
    setLoading(true);
    try {
      const pId = filtroPais ? parseInt(filtroPais) : undefined;
      const cId = filtroContinente ? parseInt(filtroContinente) : undefined;
      const res = await cidadeApi.listar(p, 10, pId, cId);
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

  useEffect(() => {
    if (filtroContinente) {
      paisApi.listarPorContinente(parseInt(filtroContinente)).then((res) => setPaises(res.data));
    } else {
      setPaises([]);
    }
    setFiltroPais('');
  }, [filtroContinente]);

  useEffect(() => { carregar(); }, [filtroPais, filtroContinente]);

  // Load all countries for the modal when it opens
  const loadModalPaises = async () => {
    try {
      const res = await paisApi.listar(1, 1000);
      setModalPaises(res.data.data);
    } catch {
      setModalPaises([]);
    }
  };

  const openCreate = () => {
    setEditItem(null);
    setNome(''); setPopulacao(''); setLatitude(''); setLongitude(''); setPaisId('');
    setShowModal(true); setError('');
    loadModalPaises();
  };

  const openEdit = (item: Cidade) => {
    setEditItem(item);
    setNome(item.nome);
    setPopulacao(item.populacao?.toString() || '');
    setLatitude(item.latitude?.toString() || '');
    setLongitude(item.longitude?.toString() || '');
    setPaisId(item.paisId.toString());
    setShowModal(true); setError('');
    loadModalPaises();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        nome,
        populacao,
        latitude: latitude ? parseFloat(latitude) : undefined,
        longitude: longitude ? parseFloat(longitude) : undefined,
        paisId: parseInt(paisId),
      };
      if (editItem) {
        await cidadeApi.atualizar(editItem.id, data);
        showToast('Cidade atualizada com sucesso!');
      } else {
        await cidadeApi.criar(data);
        showToast('Cidade criada com sucesso!');
      }
      setShowModal(false);
      carregar(pagina);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao salvar');
      showToast(err.response?.data?.error || 'Erro ao salvar', 'error');
    } finally { setLoading(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir esta cidade?')) return;
    try {
      await cidadeApi.excluir(id);
      showToast('Cidade excluída com sucesso!');
      carregar(pagina);
    } catch {
      setError('Erro ao excluir');
      showToast('Erro ao excluir cidade', 'error');
    }
  };

  const formatNum = (n: string | null | undefined) => {
    if (!n) return '—';
    return parseInt(n).toLocaleString('pt-BR');
  };

  return (
    <div className="page">
      <div className="breadcrumb"><a href="/">Início</a> <span>/</span> <span>Cidades</span></div>
      <div className="page-header">
        <h1>Cidades</h1>
        <button className="btn btn-primary" onClick={openCreate}>+ Nova Cidade</button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="filters">
        <select value={filtroContinente} onChange={(e) => setFiltroContinente(e.target.value)}>
          <option value="">Todos os continentes</option>
          {continentes.map((c) => (
            <option key={c.id} value={c.id}>{c.nome}</option>
          ))}
        </select>
        <select value={filtroPais} onChange={(e) => setFiltroPais(e.target.value)} disabled={!filtroContinente}>
          <option value="">Todos os países</option>
          {paises.map((p) => (
            <option key={p.id} value={p.id}>{p.nome}</option>
          ))}
        </select>
      </div>

      <div className="table-card">
        {loading && items.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-text">Carregando...</div>
          </div>
        ) : items.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">--</div>
            <div className="empty-state-text">Nenhuma cidade cadastrada ainda.<br />Clique em "+ Nova Cidade" para começar.</div>
          </div>
        ) : (
          <>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>País</th>
                  <th>Continente</th>
                  <th>População</th>
                  <th>Lat</th>
                  <th>Lon</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td><strong>{item.nome}</strong></td>
                    <td><span className="badge">{item.pais?.nome || '—'}</span></td>
                    <td>{item.pais?.continente?.nome || '—'}</td>
                    <td>{formatNum(item.populacao)}</td>
                    <td>{item.latitude ?? '—'}</td>
                    <td>{item.longitude ?? '—'}</td>
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
            <h2>{editItem ? 'Editar Cidade' : 'Nova Cidade'}</h2>
            {error && <div className="alert alert-error">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nome *</label>
                <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex: São Paulo" required />
              </div>
              <div className="form-group">
                <label>País *</label>
                <select value={paisId} onChange={(e) => setPaisId(e.target.value)} required>
                  <option value="">Selecione um país...</option>
                  {modalPaises.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nome} {p.continente ? `(${p.continente.nome})` : ''}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-row-3">
                <div className="form-group">
                  <label>População</label>
                  <input type="number" value={populacao} onChange={(e) => setPopulacao(e.target.value)} placeholder="12300000" />
                </div>
                <div className="form-group">
                  <label>Latitude</label>
                  <input type="number" step="any" value={latitude} onChange={(e) => setLatitude(e.target.value)} placeholder="-23.5505" />
                </div>
                <div className="form-group">
                  <label>Longitude</label>
                  <input type="number" step="any" value={longitude} onChange={(e) => setLongitude(e.target.value)} placeholder="-46.6333" />
                </div>
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
