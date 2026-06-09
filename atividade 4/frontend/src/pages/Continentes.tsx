import { useEffect, useState, FormEvent } from 'react';
import { continenteApi, Continente } from '../services/api';
import { showToast } from '../components/Toast';

export default function Continentes() {
  const [items, setItems] = useState<Continente[]>([]);
  const [total, setTotal] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<Continente | null>(null);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const carregar = async (p = 1) => {
    setLoading(true);
    try {
      const res = await continenteApi.listar(p);
      setItems(res.data.data);
      setTotal(res.data.total);
      setPagina(res.data.pagina);
      setTotalPaginas(res.data.totalPaginas);
    } catch { setError('Erro ao carregar'); }
    finally { setLoading(false); }
  };

  useEffect(() => { carregar(); }, []);

  const openCreate = () => {
    setEditItem(null);
    setNome('');
    setDescricao('');
    setShowModal(true);
    setError('');
  };

  const openEdit = (item: Continente) => {
    setEditItem(item);
    setNome(item.nome);
    setDescricao(item.descricao || '');
    setShowModal(true);
    setError('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editItem) {
        await continenteApi.atualizar(editItem.id, { nome, descricao });
        showToast('Continente atualizado com sucesso!');
      } else {
        await continenteApi.criar({ nome, descricao });
        showToast('Continente criado com sucesso!');
      }
      setShowModal(false);
      carregar(pagina);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao salvar');
      showToast(err.response?.data?.error || 'Erro ao salvar', 'error');
    } finally { setLoading(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este continente? Todos os países e cidades vinculados também serão excluídos.')) return;
    try {
      await continenteApi.excluir(id);
      showToast('Continente excluído com sucesso!');
      carregar(pagina);
    } catch {
      setError('Erro ao excluir');
      showToast('Erro ao excluir continente', 'error');
    }
  };

  return (
    <div className="page">
      <div className="breadcrumb"><a href="/">Início</a> <span>/</span> <span>Continentes</span></div>
      <div className="page-header">
        <h1>Continentes</h1>
        <button className="btn btn-primary" onClick={openCreate}>+ Novo Continente</button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="table-card">
        {loading && items.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-text">Carregando...</div>
          </div>
        ) : items.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">--</div>
            <div className="empty-state-text">Nenhum continente cadastrado ainda.<br />Clique em "+ Novo Continente" para começar.</div>
          </div>
        ) : (
          <>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th>Países</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td><strong>{item.nome}</strong></td>
                    <td>{item.descricao || '—'}</td>
                    <td><span className="badge">{item._count?.paises ?? 0}</span></td>
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
            <h2>{editItem ? 'Editar Continente' : 'Novo Continente'}</h2>
            {error && <div className="alert alert-error">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nome *</label>
                <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex: América do Sul" required />
              </div>
              <div className="form-group">
                <label>Descrição</label>
                <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição do continente" rows={3} />
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
