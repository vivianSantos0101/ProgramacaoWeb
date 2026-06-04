
import * as readlineSync from 'readline-sync';
import { CatalogoFilmes } from './CatalogoFilme';
import type { Filme } from './Filme';

const catalogo = new CatalogoFilmes();
let rodando = true;

function exibirMenu(): void {
    console.log("\n" + "=".repeat(30));
    console.log("🎬 CATÁLOGO DE FILMES");
    console.log("=".repeat(30));
    console.log("1. Adicionar um novo filme");
    console.log("2. Listar todos os filmes");
    console.log("3. Buscar filmes por título");
    console.log("4. Buscar filmes por gênero");
    console.log("5. Remover um filme pelo título");
    console.log("6. Ordenar filmes por ano (Opção Bônus)");
    console.log("0. Encerrar a aplicação");
    console.log("=".repeat(30));
}

while (rodando) {
    exibirMenu();
    const opcao = readlineSync.question("Escolha uma opcao: ");

    switch (opcao) {
        case '1':
            console.log("\n--- Novo Filme ---");
            const titulo = readlineSync.question("Titulo do filme: ");
            const anoLancamento = readlineSync.questionInt("Ano de lancamento: ");
            const genero = readlineSync.question("Genero: ");
            const duracao = readlineSync.questionInt("Duracao em minutos: ");
            const avaliacaoStr = readlineSync.question("Avaliacao (0 a 10) ou deixe em branco: ");
            
            // Tratando a tipagem opcional exigida pelo professor
            let avaliacao: number | undefined = undefined;
            if (avaliacaoStr.trim() !== "") {
                avaliacao = parseFloat(avaliacaoStr);
            }

            const novoFilme: Filme = avaliacao !== undefined
                ? { titulo, anoLancamento, genero, duracao, avaliacao }
                : { titulo, anoLancamento, genero, duracao };
            catalogo.adicionarFilme(novoFilme);
            break;

        case '2':
            console.log("\n--- Lista de Filmes ---");
            const todosOsFilmes = catalogo.listarFilmes();
            if (todosOsFilmes.length === 0) console.log("O catálogo está vazio.");
            else console.table(todosOsFilmes); // console.table deixa a visualização linda no terminal!
            break;

        case '3':
            const buscaTitulo = readlineSync.question("\nDigite o titulo para buscar: ");
            console.table(catalogo.buscarPorTitulo(buscaTitulo));
            break;

        case '4':
            const buscaGenero = readlineSync.question("\nDigite o genero para buscar: ");
            console.table(catalogo.buscarPorGenero(buscaGenero));
            break;

        case '5':
            const removeTitulo = readlineSync.question("\nDigite o titulo do filme a ser removido: ");
            catalogo.removerFilme(removeTitulo);
            break;

        case '6':
            console.log("\n--- Filmes Ordenados por Ano ---");
            console.table(catalogo.ordenarPorAno());
            break;

        case '0':
            console.log("\nEncerrando a aplicação... Até logo!");
            rodando = false;
            break;

        default:
            console.log("\n❌ Opção inválida. Tente novamente.");
    }
}