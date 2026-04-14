import { useState } from 'react';
import type { MovieFormData } from '../types/movies';
import { PlusCircle, X } from 'lucide-react';
import { generosComuns } from '../lib/mockData';

interface AddMovieFormProps {
  onAdd: (movie: Omit<MovieFormData, 'id'>) => void;
  onClose: () => void;
}

export function AddMovieForm({ onAdd, onClose }: AddMovieFormProps) {
  const [formData, setFormData] = useState<MovieFormData>({
    titulo: '',
    ano: new Date().getFullYear(),
    genero: '',
    duracao: 90,
    avaliacao: undefined,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof MovieFormData, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof MovieFormData, string>> = {};

    if (!formData.titulo.trim()) {
      newErrors.titulo = 'Título é obrigatório';
    }

    if (!formData.genero.trim()) {
      newErrors.genero = 'Gênero é obrigatório';
    }

    if (formData.ano < 1888 || formData.ano > new Date().getFullYear() + 5) {
      newErrors.ano = 'Ano inválido';
    }

    if (formData.duracao < 1) {
      newErrors.duracao = 'Duração deve ser maior que 0';
    }

    if (formData.avaliacao !== undefined) {
      if (formData.avaliacao < 0 || formData.avaliacao > 10) {
        newErrors.avaliacao = 'Avaliação deve estar entre 0 e 10';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onAdd(formData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border-4 border-[var(--color-vintage-brown)] bg-gradient-to-br from-[var(--color-vintage-paper)] to-[var(--color-vintage-cream)] p-8 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 text-[var(--color-vintage-brown)] transition-colors hover:bg-[var(--color-vintage-brown)] hover:text-white"
          aria-label="Fechar"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Title */}
        <h2 className="mb-6 text-center">Adicionar Novo Filme</h2>
        
        <div className="mb-6 flex items-center justify-center gap-2">
          <div className="h-px w-16 bg-[var(--color-vintage-gold)]" />
          <PlusCircle className="h-6 w-6 text-[var(--color-vintage-gold)]" />
          <div className="h-px w-16 bg-[var(--color-vintage-gold)]" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Título */}
          <div>
            <label className="block text-lg font-semibold text-[var(--color-vintage-dark)] mb-2">
              Título *
            </label>
            <input
              type="text"
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              className="w-full rounded-lg border-2 border-[var(--color-vintage-brown)] bg-white px-4 py-3 text-[var(--color-vintage-dark)] transition-colors focus:border-[var(--color-vintage-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--color-vintage-gold)]/20"
              placeholder="Ex: O Poderoso Chefão"
            />
            {errors.titulo && (
              <p className="mt-1 text-sm text-[var(--color-vintage-red)]">{errors.titulo}</p>
            )}
          </div>

          {/* Ano e Duração */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-lg font-semibold text-[var(--color-vintage-dark)] mb-2">
                Ano *
              </label>
              <input
                type="number"
                value={formData.ano}
                onChange={(e) => setFormData({ ...formData, ano: parseInt(e.target.value) || 0 })}
                className="w-full rounded-lg border-2 border-[var(--color-vintage-brown)] bg-white px-4 py-3 text-[var(--color-vintage-dark)] transition-colors focus:border-[var(--color-vintage-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--color-vintage-gold)]/20"
                placeholder="1972"
                min="1888"
                max={new Date().getFullYear() + 5}
              />
              {errors.ano && (
                <p className="mt-1 text-sm text-[var(--color-vintage-red)]">{errors.ano}</p>
              )}
            </div>

            <div>
              <label className="block text-lg font-semibold text-[var(--color-vintage-dark)] mb-2">
                Duração (minutos) *
              </label>
              <input
                type="number"
                value={formData.duracao}
                onChange={(e) => setFormData({ ...formData, duracao: parseInt(e.target.value) || 0 })}
                className="w-full rounded-lg border-2 border-[var(--color-vintage-brown)] bg-white px-4 py-3 text-[var(--color-vintage-dark)] transition-colors focus:border-[var(--color-vintage-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--color-vintage-gold)]/20"
                placeholder="120"
                min="1"
              />
              {errors.duracao && (
                <p className="mt-1 text-sm text-[var(--color-vintage-red)]">{errors.duracao}</p>
              )}
            </div>
          </div>

          {/* Gênero */}
          <div>
            <label className="block text-lg font-semibold text-[var(--color-vintage-dark)] mb-2">
              Gênero *
            </label>
            <input
              type="text"
              list="generos"
              value={formData.genero}
              onChange={(e) => setFormData({ ...formData, genero: e.target.value })}
              className="w-full rounded-lg border-2 border-[var(--color-vintage-brown)] bg-white px-4 py-3 text-[var(--color-vintage-dark)] transition-colors focus:border-[var(--color-vintage-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--color-vintage-gold)]/20"
              placeholder="Ex: Drama, Comédia, Terror..."
            />
            <datalist id="generos">
              {generosComuns.map((genero: string) => (
                <option key={genero} value={genero} />
              ))}
            </datalist>
            {errors.genero && (
              <p className="mt-1 text-sm text-[var(--color-vintage-red)]">{errors.genero}</p>
            )}
          </div>

          {/* Avaliação */}
          <div>
            <label className="block text-lg font-semibold text-[var(--color-vintage-dark)] mb-2">
              Avaliação (0-10) - Opcional
            </label>
            <input
              type="number"
              value={formData.avaliacao ?? ''}
              onChange={(e) => setFormData({ 
                ...formData, 
                avaliacao: e.target.value ? parseFloat(e.target.value) : undefined 
              })}
              className="w-full rounded-lg border-2 border-[var(--color-vintage-brown)] bg-white px-4 py-3 text-[var(--color-vintage-dark)] transition-colors focus:border-[var(--color-vintage-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--color-vintage-gold)]/20"
              placeholder="Ex: 8.5"
              min="0"
              max="10"
              step="0.1"
            />
            {errors.avaliacao && (
              <p className="mt-1 text-sm text-[var(--color-vintage-red)]">{errors.avaliacao}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border-2 border-[var(--color-vintage-brown)] bg-white px-6 py-3 font-semibold text-[var(--color-vintage-brown)] transition-colors hover:bg-[var(--color-vintage-brown)] hover:text-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg border-2 border-[var(--color-vintage-gold)] bg-[var(--color-vintage-gold)] px-6 py-3 font-semibold text-white shadow-lg transition-all hover:bg-[var(--color-vintage-brown)] hover:border-[var(--color-vintage-brown)] hover:shadow-xl"
            >
              Adicionar Filme
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
