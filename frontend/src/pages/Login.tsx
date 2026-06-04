import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../services/api';

export default function Login() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = isRegister
        ? await authApi.register(nome, email, senha)
        : await authApi.login(email, senha);
      const { token, usuario } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao autenticar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">CM</div>
          <h2>CRUD Mundo</h2>
          <p>{isRegister ? 'Crie sua conta' : 'Faça login para continuar'}</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="alert alert-error">{error}</div>}

          {isRegister && (
            <div className="form-group">
              <label htmlFor="nome">Nome</label>
              <input id="nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Seu nome" required />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" required />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input id="senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Sua senha" required minLength={4} />
          </div>

          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? 'Aguarde...' : isRegister ? 'Cadastrar' : 'Entrar'}
          </button>
        </form>

        <p className="login-switch">
          {isRegister ? 'Já tem conta?' : 'Não tem conta?'}{' '}
          <button className="link-btn" onClick={() => { setIsRegister(!isRegister); setError(''); }}>
            {isRegister ? 'Faça login' : 'Cadastre-se'}
          </button>
        </p>
      </div>
    </div>
  );
}
