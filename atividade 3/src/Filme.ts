
export interface Filme {
    titulo: string;
    anoLancamento: number;
    genero: string;
    duracao: number; // duração em minutos
    avaliacao?: number; // número entre 0 e 10 
}