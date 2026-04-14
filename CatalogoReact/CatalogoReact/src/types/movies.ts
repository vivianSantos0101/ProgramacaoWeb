/**
 * Interface que representa um Filme no catálogo
 */
export interface Movie {
  id: string;
  titulo: string;
  ano: number;
  genero: string;
  duracao: number; // em minutos
  avaliacao?: number; // opcional, entre 0 e 10
}

/**
 * Tipos para os filtros de busca
 */
export type SearchType = 'titulo' | 'genero';

/**
 * Tipos para ordenação
 */
export type SortType = 'ano-asc' | 'ano-desc' | 'avaliacao-asc' | 'avaliacao-desc' | 'titulo';

/**
 * Interface para o formulário de adicionar filme
 */
export interface MovieFormData {
  titulo: string;
  ano: number;
  genero: string;
  duracao: number;
  avaliacao?: number;
}
