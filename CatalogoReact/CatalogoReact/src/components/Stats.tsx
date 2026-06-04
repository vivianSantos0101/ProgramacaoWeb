import { Film, Star, Tag, TrendingUp } from 'lucide-react';

interface StatsProps {
  total: number;
  comAvaliacao: number;
  mediaAvaliacao: number;
  totalGeneros: number;
}

export function Stats({ total, comAvaliacao, mediaAvaliacao, totalGeneros }: StatsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {/* Total de filmes */}
      <div className="relative overflow-hidden rounded-lg border-3 border-[var(--color-vintage-brown)] bg-gradient-to-br from-white to-[var(--color-vintage-paper)] p-5 shadow-md">
        <div className="absolute top-0 right-0 h-16 w-16 translate-x-4 -translate-y-4 rounded-full bg-[var(--color-vintage-gold)]/10" />
        <div className="relative">
          <Film className="mb-2 h-8 w-8 text-[var(--color-vintage-brown)]" />
          <p className="text-3xl font-bold text-[var(--color-vintage-dark)]">{total}</p>
          <p className="text-sm font-semibold text-[var(--color-vintage-sepia)]">
            Filmes Total
          </p>
        </div>
      </div>

      {/* Com avaliação */}
      <div className="relative overflow-hidden rounded-lg border-3 border-[var(--color-vintage-brown)] bg-gradient-to-br from-white to-[var(--color-vintage-paper)] p-5 shadow-md">
        <div className="absolute top-0 right-0 h-16 w-16 translate-x-4 -translate-y-4 rounded-full bg-[var(--color-vintage-gold)]/10" />
        <div className="relative">
          <TrendingUp className="mb-2 h-8 w-8 text-[var(--color-vintage-brown)]" />
          <p className="text-3xl font-bold text-[var(--color-vintage-dark)]">{comAvaliacao}</p>
          <p className="text-sm font-semibold text-[var(--color-vintage-sepia)]">
            Avaliados
          </p>
        </div>
      </div>

      {/* Média de avaliação */}
      <div className="relative overflow-hidden rounded-lg border-3 border-[var(--color-vintage-brown)] bg-gradient-to-br from-white to-[var(--color-vintage-paper)] p-5 shadow-md">
        <div className="absolute top-0 right-0 h-16 w-16 translate-x-4 -translate-y-4 rounded-full bg-[var(--color-vintage-gold)]/10" />
        <div className="relative">
          <Star className="mb-2 h-8 w-8 fill-[var(--color-vintage-gold)] text-[var(--color-vintage-gold)]" />
          <p className="text-3xl font-bold text-[var(--color-vintage-dark)]">
            {mediaAvaliacao > 0 ? mediaAvaliacao.toFixed(1) : '—'}
          </p>
          <p className="text-sm font-semibold text-[var(--color-vintage-sepia)]">
            Média
          </p>
        </div>
      </div>

      {/* Total de gêneros */}
      <div className="relative overflow-hidden rounded-lg border-3 border-[var(--color-vintage-brown)] bg-gradient-to-br from-white to-[var(--color-vintage-paper)] p-5 shadow-md">
        <div className="absolute top-0 right-0 h-16 w-16 translate-x-4 -translate-y-4 rounded-full bg-[var(--color-vintage-gold)]/10" />
        <div className="relative">
          <Tag className="mb-2 h-8 w-8 text-[var(--color-vintage-brown)]" />
          <p className="text-3xl font-bold text-[var(--color-vintage-dark)]">{totalGeneros}</p>
          <p className="text-sm font-semibold text-[var(--color-vintage-sepia)]">
            Gêneros
          </p>
        </div>
      </div>
    </div>
  );
}
