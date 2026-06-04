import { useState } from 'react';
import { Search, Film } from 'lucide-react';
import type { SearchType } from '../types/movies';

interface SearchBarProps {
  onSearch: (query: string, type: SearchType) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<SearchType>('titulo');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, searchType);
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="flex flex-col gap-3 md:flex-row">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-vintage-brown)]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Buscar por ${searchType}...`}
            className="w-full rounded-lg border-2 border-[var(--color-vintage-brown)] bg-white py-3 pl-12 pr-4 text-lg text-[var(--color-vintage-dark)] transition-colors focus:border-[var(--color-vintage-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--color-vintage-gold)]/20"
          />
        </div>

        {/* Search type selector */}
        <div className="flex gap-2">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value as SearchType)}
            className="rounded-lg border-2 border-[var(--color-vintage-brown)] bg-white px-4 py-3 text-lg font-semibold text-[var(--color-vintage-brown)] transition-colors focus:border-[var(--color-vintage-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--color-vintage-gold)]/20"
          >
            <option value="titulo">Título</option>
            <option value="genero">Gênero</option>
          </select>

          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg border-2 border-[var(--color-vintage-gold)] bg-[var(--color-vintage-gold)] px-6 py-3 font-semibold text-white shadow-lg transition-all hover:bg-[var(--color-vintage-brown)] hover:border-[var(--color-vintage-brown)] hover:shadow-xl"
          >
            <Film className="h-5 w-5" />
            <span className="hidden sm:inline">Buscar</span>
          </button>
        </div>
      </div>
    </form>
  );
}
