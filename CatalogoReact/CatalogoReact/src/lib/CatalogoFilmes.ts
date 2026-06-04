import type { Movie, SortType } from '../types/movies';

/**
 * Classe responsável por gerenciar o catálogo de filmes
 * Implementa todas as operações CRUD e busca
 */
export class CatalogoFilmes {
  private filmes: Movie[] = [];

  constructor(filmesIniciais?: Movie[]) {
    if (filmesIniciais) {
      this.filmes = filmesIniciais;
    }
  }

  /**
   * Adiciona um novo filme ao catálogo
   * Valida a avaliação para estar entre 0 e 10
   */
  adicionarFilme(filme: Omit<Movie, 'id'>): Movie {
    // Validação da avaliação
    if (filme.avaliacao !== undefined) {
      if (filme.avaliacao < 0 || filme.avaliacao > 10) {
        throw new Error('A avaliação deve estar entre 0 e 10');
      }
    }

    const novoFilme: Movie = {
      ...filme,
      id: this.gerarId(),
    };

    this.filmes.push(novoFilme);
    return novoFilme;
  }

  /**
   * Lista todos os filmes do catálogo
   */
  listarTodos(): Movie[] {
    return [...this.filmes];
  }

  /**
   * Busca filmes por título (busca parcial, case-insensitive)
   */
  buscarPorTitulo(titulo: string): Movie[] {
    const tituloLower = titulo.toLowerCase().trim();
    return this.filmes.filter(filme => 
      filme.titulo.toLowerCase().includes(tituloLower)
    );
  }

  /**
   * Busca filmes por gênero (busca parcial, case-insensitive)
   */
  buscarPorGenero(genero: string): Movie[] {
    const generoLower = genero.toLowerCase().trim();
    return this.filmes.filter(filme => 
      filme.genero.toLowerCase().includes(generoLower)
    );
  }

  /**
   * Remove um filme pelo título (remoção exata)
   */
  removerPorTitulo(titulo: string): boolean {
    const index = this.filmes.findIndex(
      filme => filme.titulo.toLowerCase() === titulo.toLowerCase().trim()
    );

    if (index !== -1) {
      this.filmes.splice(index, 1);
      return true;
    }

    return false;
  }

 
  ordenar(tipo: SortType): Movie[] {
    const filmesOrdenados = [...this.filmes];

    switch (tipo) {
      case 'ano-asc':
        return filmesOrdenados.sort((a, b) => a.ano - b.ano);
      
      case 'ano-desc':
        return filmesOrdenados.sort((a, b) => b.ano - a.ano);
      
      case 'avaliacao-asc':
        return filmesOrdenados.sort((a, b) => {
          const avalA = a.avaliacao ?? 0;
          const avalB = b.avaliacao ?? 0;
          return avalA - avalB;
        });
      
      case 'avaliacao-desc':
        return filmesOrdenados.sort((a, b) => {
          const avalA = a.avaliacao ?? 0;
          const avalB = b.avaliacao ?? 0;
          return avalB - avalA;
        });
      
      case 'titulo':
        return filmesOrdenados.sort((a, b) => 
          a.titulo.localeCompare(b.titulo)
        );
      
      default:
        return filmesOrdenados;
    }
  }

  /**
   * Retorna o número total de filmes no catálogo
   */
  getTotalFilmes(): number {
    return this.filmes.length;
  }

  /**
   * Gera um ID único para novos filmes
   */
  private gerarId(): string {
    return `movie-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Retorna estatísticas do catálogo
   */
  getEstatisticas() {
    const total = this.filmes.length;
    const comAvaliacao = this.filmes.filter(f => f.avaliacao !== undefined).length;
    const mediaAvaliacao = comAvaliacao > 0
      ? this.filmes
          .filter(f => f.avaliacao !== undefined)
          .reduce((acc, f) => acc + (f.avaliacao || 0), 0) / comAvaliacao
      : 0;
    
    const generos = new Set(this.filmes.map(f => f.genero));

    return {
      total,
      comAvaliacao,
      mediaAvaliacao: Math.round(mediaAvaliacao * 10) / 10,
      totalGeneros: generos.size,
    };
  }
}
