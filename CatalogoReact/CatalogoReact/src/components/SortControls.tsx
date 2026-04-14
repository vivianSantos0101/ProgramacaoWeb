import type { SortType } from '../types/movies';
import { ArrowUpDown } from 'lucide-react';

interface SortControlsProps {
  currentSort: SortType;
  onSortChange: (sort: SortType) => void;
}

export function SortControls({ currentSort, onSortChange }: SortControlsProps) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="flex items-center gap-2">
        <ArrowUpDown className="h-5 w-5 text-[var(--color-vintage-brown)]" />
        <span className="text-lg font-semibold text-[var(--color-vintage-brown)]">
          Ordenar por:
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSortChange('titulo')}
          className={`rounded-full border-2 px-4 py-2 font-semibold transition-all ${
            currentSort === 'titulo'
              ? 'border-[var(--color-vintage-gold)] bg-[var(--color-vintage-gold)] text-white shadow-lg'
              : 'border-[var(--color-vintage-brown)] bg-white text-[var(--color-vintage-brown)] hover:border-[var(--color-vintage-gold)] hover:bg-[var(--color-vintage-gold)] hover:text-white'
          }`}
        >
          Título
        </button>

        <button
          onClick={() => onSortChange('ano-desc')}
          className={`rounded-full border-2 px-4 py-2 font-semibold transition-all ${
            currentSort === 'ano-desc'
              ? 'border-[var(--color-vintage-gold)] bg-[var(--color-vintage-gold)] text-white shadow-lg'
              : 'border-[var(--color-vintage-brown)] bg-white text-[var(--color-vintage-brown)] hover:border-[var(--color-vintage-gold)] hover:bg-[var(--color-vintage-gold)] hover:text-white'
          }`}
        >
          Ano ↓
        </button>

        <button
          onClick={() => onSortChange('ano-asc')}
          className={`rounded-full border-2 px-4 py-2 font-semibold transition-all ${
            currentSort === 'ano-asc'
              ? 'border-[var(--color-vintage-gold)] bg-[var(--color-vintage-gold)] text-white shadow-lg'
              : 'border-[var(--color-vintage-brown)] bg-white text-[var(--color-vintage-brown)] hover:border-[var(--color-vintage-gold)] hover:bg-[var(--color-vintage-gold)] hover:text-white'
          }`}
        >
          Ano ↑
        </button>

        <button
          onClick={() => onSortChange('avaliacao-desc')}
          className={`rounded-full border-2 px-4 py-2 font-semibold transition-all ${
            currentSort === 'avaliacao-desc'
              ? 'border-[var(--color-vintage-gold)] bg-[var(--color-vintage-gold)] text-white shadow-lg'
              : 'border-[var(--color-vintage-brown)] bg-white text-[var(--color-vintage-brown)] hover:border-[var(--color-vintage-gold)] hover:bg-[var(--color-vintage-gold)] hover:text-white'
          }`}
        >
          Avaliação ↓
        </button>

        <button
          onClick={() => onSortChange('avaliacao-asc')}
          className={`rounded-full border-2 px-4 py-2 font-semibold transition-all ${
            currentSort === 'avaliacao-asc'
              ? 'border-[var(--color-vintage-gold)] bg-[var(--color-vintage-gold)] text-white shadow-lg'
              : 'border-[var(--color-vintage-brown)] bg-white text-[var(--color-vintage-brown)] hover:border-[var(--color-vintage-gold)] hover:bg-[var(--color-vintage-gold)] hover:text-white'
          }`}
        >
          Avaliação ↑
        </button>
      </div>
    </div>
  );
}
