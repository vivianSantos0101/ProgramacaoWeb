import { useState, FormEvent, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../services/api';
import * as THREE from 'three';

export default function Login() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 14;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x071a10, 1);

    const geo = new THREE.SphereGeometry(6, 16, 16);
    const mat = new THREE.MeshBasicMaterial({ color: 0x22c55e, wireframe: true, transparent: true, opacity: 0.3 });
    const globe = new THREE.Mesh(geo, mat);
    scene.add(globe);

    const ptsGeo = new THREE.BufferGeometry();
    const count = 600;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 60;
    ptsGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const pts = new THREE.Points(ptsGeo, new THREE.PointsMaterial({ size: 0.06, color: 0x4ade80, transparent: true, opacity: 0.3 }));
    scene.add(pts);

    let mouseX = 0, mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    document.addEventListener('mousemove', handleMouseMove);

    const clock = new THREE.Clock();

    const tick = () => {
      requestAnimationFrame(tick);
      const t = clock.getElapsedTime();
      globe.rotation.y = t * 0.05;
      globe.rotation.x += 0.03 * (mouseY * 0.3 - globe.rotation.x);
      globe.rotation.y += 0.03 * (mouseX * 0.3 - (globe.rotation.y - t * 0.05));
      renderer.render(scene, camera);
    };
    tick();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

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
      <canvas ref={canvasRef} className="login-canvas" />
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
