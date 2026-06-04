import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export interface Continente {
  id: number;
  nome: string;
  descricao: string | null;
  _count?: { paises: number };
  paises?: Pais[];
}

export interface Pais {
  id: number;
  nome: string;
  populacao: string | null;
  idiomaOficial: string | null;
  moeda: string | null;
  continenteId: number;
  continente?: { id: number; nome: string };
  _count?: { cidades: number };
  cidades?: Cidade[];
}

export interface Cidade {
  id: number;
  nome: string;
  populacao: string | null;
  latitude: number | null;
  longitude: number | null;
  paisId: number;
  pais?: { id: number; nome: string; continente: { id: number; nome: string } };
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  pagina: number;
  totalPaginas: number;
}

export interface CountryInfo {
  nomeOficial: string;
  capital: string;
  regiao: string;
  subregiao: string;
  populacao: number;
  area: number;
  bandeira: string;
  brasao: string;
  mapa: string;
  fusoHorario: string;
  moedas: string;
  idiomas: string;
  ddi: string;
}

export interface WeatherData {
  temperatura: number;
  sensacao: number;
  umidade: number;
  descricao: string;
  icone: string;
  vento: number;
  cidade: string;
}

export const authApi = {
  login: (email: string, senha: string) => api.post('/auth/login', { email, senha }),
  register: (nome: string, email: string, senha: string) => api.post('/auth/register', { nome, email, senha }),
};

export const continenteApi = {
  listar: (pagina = 1, limite = 10) => api.get<PaginatedResponse<Continente>>('/continentes', { params: { pagina, limite } }),
  listarTodos: () => api.get<Continente[]>('/continentes/todos'),
  obter: (id: number) => api.get<Continente>(`/continentes/${id}`),
  criar: (data: { nome: string; descricao?: string }) => api.post<Continente>('/continentes', data),
  atualizar: (id: number, data: { nome?: string; descricao?: string }) => api.put<Continente>(`/continentes/${id}`, data),
  excluir: (id: number) => api.delete(`/continentes/${id}`),
};

export const paisApi = {
  listar: (pagina = 1, limite = 10, continenteId?: number) =>
    api.get<PaginatedResponse<Pais>>('/paises', { params: { pagina, limite, continenteId } }),
  listarPorContinente: (continenteId: number) => api.get<Pais[]>(`/paises/por-continente/${continenteId}`),
  obter: (id: number) => api.get<Pais>(`/paises/${id}`),
  criar: (data: { nome: string; populacao?: string; idiomaOficial?: string; moeda?: string; continenteId: number }) =>
    api.post<Pais>('/paises', data),
  atualizar: (id: number, data: { nome?: string; populacao?: string; idiomaOficial?: string; moeda?: string; continenteId?: number }) =>
    api.put<Pais>(`/paises/${id}`, data),
  excluir: (id: number) => api.delete(`/paises/${id}`),
};

export const cidadeApi = {
  listar: (pagina = 1, limite = 10, paisId?: number, continenteId?: number) =>
    api.get<PaginatedResponse<Cidade>>('/cidades', { params: { pagina, limite, paisId, continenteId } }),
  listarPorPais: (paisId: number) => api.get<Cidade[]>(`/cidades/por-pais/${paisId}`),
  obter: (id: number) => api.get<Cidade>(`/cidades/${id}`),
  criar: (data: { nome: string; populacao?: string; latitude?: number; longitude?: number; paisId: number }) =>
    api.post<Cidade>('/cidades', data),
  atualizar: (id: number, data: { nome?: string; populacao?: string; latitude?: number; longitude?: number; paisId?: number }) =>
    api.put<Cidade>(`/cidades/${id}`, data),
  excluir: (id: number) => api.delete(`/cidades/${id}`),
};

export const externalApi = {
  getPaisInfo: (nome: string) => api.get<CountryInfo>(`/external/pais/${encodeURIComponent(nome)}`),
  getClima: (lat: number, lon: number) => api.get<WeatherData>('/external/clima', { params: { lat, lon } }),
};

export default api;
