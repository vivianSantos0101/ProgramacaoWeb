import type { Movie } from '../types/movies';
import { Clock, Calendar, Film, Star, Trash2 } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
  onDelete: (titulo: string) => void;
}

export function MovieCard({ movie, onDelete }: MovieCardProps) {
  const formatDuracao = (minutos: number): string => {
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;
    return horas > 0 ? `${horas}h ${mins}min` : `${mins}min`;
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border-4 border-[var(--color-vintage-brown)] bg-gradient-to-br from-[var(--color-vintage-paper)] to-[var(--color-vintage-cream)] p-5 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      {/* Decorative corner ornaments */}
      <div className="absolute top-0 left-0 h-8 w-8 border-t-4 border-l-4 border-[var(--color-vintage-gold)] opacity-60" />
      <div className="absolute top-0 right-0 h-8 w-8 border-t-4 border-r-4 border-[var(--color-vintage-gold)] opacity-60" />
      <div className="absolute bottom-0 left-0 h-8 w-8 border-b-4 border-l-4 border-[var(--color-vintage-gold)] opacity-60" />
      <div className="absolute bottom-0 right-0 h-8 w-8 border-b-4 border-r-4 border-[var(--color-vintage-gold)] opacity-60" />

      {/* Film grain effect */}
      <div className="film-grain absolute inset-0 pointer-events-none" />

      <div className="relative">
        {/* Header with title and delete button */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-2xl font-bold text-[var(--color-vintage-dark)] leading-tight flex-1">
            {movie.titulo}
          </h3>
          <button
            onClick={() => onDelete(movie.id)}
            className="flex-shrink-0 rounded-full p-2 text-[var(--color-vintage-red)] opacity-0 transition-all duration-200 hover:bg-[var(--color-vintage-red)] hover:text-white group-hover:opacity-100"
            aria-label="Remover filme"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>

        {/* Genre badge */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-full border-2 border-[var(--color-vintage-brown)] bg-white px-3 py-1 text-sm font-semibold text-[var(--color-vintage-brown)]">
            <Film className="h-3 w-3" />
            {movie.genero}
          </span>
        </div>

        {/* Movie details */}
        <div className="space-y-2 border-t-2 border-dashed border-[var(--color-vintage-brown)]/30 pt-3">
          <div className="flex items-center gap-2 text-[var(--color-vintage-brown)]">
            <Calendar className="h-4 w-4" />
            <span className="text-lg font-semibold">{movie.ano}</span>
          </div>

          <div className="flex items-center gap-2 text-[var(--color-vintage-brown)]">
            <Clock className="h-4 w-4" />
            <span className="text-lg">{formatDuracao(movie.duracao)}</span>
          </div>

          {movie.avaliacao !== undefined && (
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-[var(--color-vintage-gold)] text-[var(--color-vintage-gold)]" />
              <span className="text-2xl font-bold text-[var(--color-vintage-dark)]">
                {movie.avaliacao.toFixed(1)}
              </span>
              <span className="text-sm text-[var(--color-vintage-sepia)]">/10</span>
            </div>
          )}

          {movie.avaliacao === undefined && (
            <div className="flex items-center gap-2 text-[var(--color-vintage-sepia)] italic">
              <Star className="h-4 w-4" />
              <span className="text-sm">Sem avaliação</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
