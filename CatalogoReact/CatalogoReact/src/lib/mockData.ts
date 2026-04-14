import type { Movie } from '../types/movies';

/**
 * Dados mock de filmes clássicos para popular o catálogo inicial
 */
export const filmesIniciais: Omit<Movie, 'id'>[] = [
  {
    titulo: 'O Poderoso Chefão',
    ano: 1972,
    genero: 'Drama/Crime',
    duracao: 175,
    avaliacao: 9.2,
  },
  {
    titulo: 'Casablanca',
    ano: 1942,
    genero: 'Romance/Drama',
    duracao: 102,
    avaliacao: 8.5,
  },
  {
    titulo: 'Cidadão Kane',
    ano: 1941,
    genero: 'Drama',
    duracao: 119,
    avaliacao: 8.3,
  },
  {
    titulo: 'O Iluminado',
    ano: 1980,
    genero: 'Terror/Suspense',
    duracao: 146,
    avaliacao: 8.4,
  },
  {
    titulo: 'De Volta para o Futuro',
    ano: 1985,
    genero: 'Ficção Científica/Aventura',
    duracao: 116,
    avaliacao: 8.5,
  },
  {
    titulo: 'O Grande Lebowski',
    ano: 1998,
    genero: 'Comédia/Crime',
    duracao: 117,
    avaliacao: 8.1,
  },
  {
    titulo: 'Cantando na Chuva',
    ano: 1952,
    genero: 'Musical/Romance',
    duracao: 103,
    avaliacao: 8.3,
  },
  {
    titulo: 'Psicose',
    ano: 1960,
    genero: 'Terror/Suspense',
    duracao: 109,
    avaliacao: 8.5,
  },
  {
    titulo: 'Lawrence da Arábia',
    ano: 1962,
    genero: 'Aventura/Drama',
    duracao: 228,
    avaliacao: 8.3,
  },
  {
    titulo: 'Os Bons Companheiros',
    ano: 1990,
    genero: 'Crime/Drama',
    duracao: 146,
    avaliacao: 8.7,
  },
  {
    titulo: 'Intriga Internacional',
    ano: 1959,
    genero: 'Suspense/Ação',
    duracao: 136,
    avaliacao: 8.3,
  },
  {
    titulo: 'Blade Runner',
    ano: 1982,
    genero: 'Ficção Científica/Neo-noir',
    duracao: 117,
    avaliacao: 8.1,
  },
];

/**
 * Gêneros mais comuns no cinema clássico
 */
export const generosComuns = [
  'Drama',
  'Comédia',
  'Romance',
  'Terror',
  'Suspense',
  'Ficção Científica',
  'Aventura',
  'Crime',
  'Musical',
  'Western',
  'Film Noir',
  'Ação',
  'Fantasia',
  'Documentário',
];
