import { Film } from 'lucide-react';

export function VintageHeader() {
  return (
    <header className="relative overflow-hidden border-b-4 border-[var(--color-vintage-brown)] bg-gradient-to-b from-[var(--color-vintage-paper)] to-[var(--color-vintage-cream)] py-8 shadow-lg">
      {/* Decorative film strip top */}
      <div className="absolute top-0 left-0 right-0 h-3 bg-[var(--color-vintage-film)]">
        <div className="flex h-full">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="w-4 flex-shrink-0 border-r-2 border-[var(--color-vintage-paper)]"
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 pt-4">
        <div className="flex items-center justify-center gap-4">
          {/* Left decorative element */}
          <div className="hidden md:block">
            <div className="flex items-center gap-2">
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-[var(--color-vintage-gold)]" />
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-2 w-2 rotate-45 bg-[var(--color-vintage-gold)]"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Main title */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Film className="h-10 w-10 text-[var(--color-vintage-red)]" strokeWidth={2} />
              <h1 className="text-5xl md:text-6xl font-black tracking-wider">
                CineVintage
              </h1>
              <Film className="h-10 w-10 text-[var(--color-vintage-red)]" strokeWidth={2} />
            </div>
            <p className="text-lg md:text-xl text-[var(--color-vintage-brown)] tracking-widest font-semibold">
              CATÁLOGO CLÁSSICO DE FILMES
            </p>
            <div className="mt-3 flex items-center justify-center gap-2">
              <div className="h-px w-16 bg-[var(--color-vintage-gold)]" />
              <span className="text-sm text-[var(--color-vintage-sepia)] tracking-wide">
                EST. 1895
              </span>
              <div className="h-px w-16 bg-[var(--color-vintage-gold)]" />
            </div>
          </div>

          {/* Right decorative element */}
          <div className="hidden md:block">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-2 w-2 rotate-45 bg-[var(--color-vintage-gold)]"
                  />
                ))}
              </div>
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-[var(--color-vintage-gold)]" />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-1">
        <div className="h-full bg-gradient-to-r from-[var(--color-vintage-gold)] via-[var(--color-vintage-brown)] to-[var(--color-vintage-gold)]" />
      </div>
    </header>
  );
}
