import { useState, useMemo } from 'react';
import { VintageHeader } from './components/VintageHeader';
import { SearchBar } from './components/SearchBar';
import { SortControls } from './components/SortControls';
import { Stats } from './components/Stats';
import { MovieCard } from './components/MovieCard';
import { AddMovieForm } from './components/AddMovieForm';
import { CatalogoFilmes } from './lib/CatalogoFilmes';
import { filmesIniciais } from './lib/mockData';
import type { SearchType, SortType, MovieFormData } from './types/movies';
import { PlusCircle, AlertCircle, Film } from 'lucide-react';
import { toast, Toaster } from 'sonner';

function App() {
  // Inicializar catálogo com filmes mock
  const [catalogo] = useState(() => {
    const cat = new CatalogoFilmes();
    filmesIniciais.forEach((filme: any) => {
      try {
        cat.adicionarFilme(filme);
      } catch (error) {
        console.error('Erro ao adicionar filme inicial:', error);
      }
    });
    return cat;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<SearchType>('titulo');
  const [sortType, setSortType] = useState<SortType>('ano-desc');
  const [showAddForm, setShowAddForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Buscar e filtrar filmes
  const filteredMovies = useMemo(() => {
    let movies = catalogo.listarTodos();

    // Aplicar busca se houver query
    if (searchQuery.trim()) {
      if (searchType === 'titulo') {
        movies = catalogo.buscarPorTitulo(searchQuery);
      } else {
        movies = catalogo.buscarPorGenero(searchQuery);
      }
    }

    // Aplicar ordenação
    const catalogoTemp = new CatalogoFilmes(movies);
    return catalogoTemp.ordenar(sortType);
  }, [catalogo, searchQuery, searchType, sortType, refreshKey]);

  // Estatísticas
  const stats = catalogo.getEstatisticas();

  // Handlers
  const handleSearch = (query: string, type: SearchType) => {
    setSearchQuery(query);
    setSearchType(type);
  };

  const handleAddMovie = (movieData: Omit<MovieFormData, 'id'>) => {
    try {
      catalogo.adicionarFilme(movieData);
      setRefreshKey(prev => prev + 1);
      toast.success(`"${movieData.titulo}" foi adicionado ao catálogo!`, {
        description: `${movieData.genero} • ${movieData.ano}`,
        duration: 3000,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error('Erro ao adicionar filme', {
          description: error.message,
          duration: 4000,
        });
      }
    }
  };

const handleDeleteMovie = (titulo: string) => {
    if (confirm(`Deseja realmente remover "${titulo}" do catálogo?`)) {
      const success = catalogo.removerPorTitulo(titulo);
      
      if (success) {
        setRefreshKey(prev => prev + 1);
        toast.success(`"${titulo}" foi removido do catálogo`, {
          duration: 3000,
        });
      } else {
        toast.error('Não foi possível remover o filme', {
          duration: 3000,
        });
      }
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen pb-12">
      <Toaster position="top-right" richColors />
      
      <VintageHeader />

      <main className="w-full bg-[var(--color-vintage-cream)]">
        {/* Stats Section */}
        <div className="container mx-auto px-4 py-8">
          <Stats
            total={stats.total}
            comAvaliacao={stats.comAvaliacao}
            mediaAvaliacao={stats.mediaAvaliacao}
            totalGeneros={stats.totalGeneros}
          />
        </div>

        {/* Divider */}
        <div className="border-t-2 border-[var(--color-vintage-brown)]" />

        <div className="container mx-auto px-4 py-8">
          {/* Search Bar Section */}
          <div className="mb-8">
            <div className="rounded-2xl border-3 border-[var(--color-vintage-brown)] bg-gradient-to-br from-white to-[var(--color-vintage-paper)] p-6 shadow-lg">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>

          {/* Sort Controls and Add Button Section */}
          <div className="mb-8 flex flex-col items-center justify-between gap-6 lg:flex-row lg:items-start">
            <div className="w-full lg:w-auto">
              <SortControls currentSort={sortType} onSortChange={setSortType} />
            </div>
            
            <button
              onClick={() => setShowAddForm(true)}
              className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-[var(--color-vintage-gold)] bg-[var(--color-vintage-gold)] px-8 py-3 font-semibold text-white shadow-lg transition-all hover:bg-[var(--color-vintage-brown)] hover:border-[var(--color-vintage-brown)] hover:shadow-xl lg:w-auto"
            >
              <PlusCircle className="h-5 w-5" />
              Adicionar Filme
            </button>
          </div>

          {/* Active search indicator */}
          {searchQuery && (
            <div className="mb-6 flex flex-col items-start justify-between gap-4 rounded-lg border-2 border-[var(--color-vintage-gold)] bg-[var(--color-vintage-gold)]/10 p-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 flex-shrink-0 text-[var(--color-vintage-brown)]" />
                <p className="font-semibold text-[var(--color-vintage-dark)]">
                  Buscando por {searchType}: "{searchQuery}" • {filteredMovies.length} resultado(s)
                </p>
              </div>
              <button
                onClick={handleClearSearch}
                className="w-full rounded-lg border-2 border-[var(--color-vintage-brown)] bg-white px-4 py-2 font-semibold text-[var(--color-vintage-brown)] transition-colors hover:bg-[var(--color-vintage-brown)] hover:text-white sm:w-auto"
              >
                Limpar Busca
              </button>
            </div>
          )}

          {/* Movies Grid */}
          {filteredMovies.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onDelete={handleDeleteMovie} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border-4 border-dashed border-[var(--color-vintage-brown)] bg-white/50 p-12 text-center">
              <Film className="mx-auto mb-4 h-16 w-16 text-[var(--color-vintage-sepia)]" />
              <h3 className="mb-2 text-2xl font-bold text-[var(--color-vintage-dark)]">
                {searchQuery ? 'Nenhum filme encontrado' : 'Catálogo vazio'}
              </h3>
              <p className="text-lg text-[var(--color-vintage-sepia)]">
                {searchQuery 
                  ? `Não encontramos filmes com ${searchType} "${searchQuery}"`
                  : 'Adicione seu primeiro filme clássico ao catálogo'}
              </p>
            </div>
          )}

          {/* Decorative footer element */}
          <div className="mt-12 flex items-center justify-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[var(--color-vintage-brown)]" />
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-2 w-2 rotate-45 bg-[var(--color-vintage-gold)]"
                />
              ))}
            </div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[var(--color-vintage-brown)]" />
          </div>
        </div>
      </main>

      {/* Add Movie Form Modal */}
      {showAddForm && (
        <AddMovieForm
          onAdd={handleAddMovie}
          onClose={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
}

export default App;
