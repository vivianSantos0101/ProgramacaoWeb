# World Vision (Gerenciamento Geográfico)

Um sistema completo (Full-Stack) para o gerenciamento de continentes, países e cidades, incluindo integração com APIs externas para obtenção de dados geográficos e climáticos.

## Tecnologias Utilizadas

**Backend:**
- Node.js com TypeScript
- Express.js
- Prisma ORM
- PostgreSQL
- JWT para Autenticação
- Axios (para consumo das APIs externas)

**Frontend:**
- React (Vite) com TypeScript
- React Router DOM
- Three.js (para o globo 3D interativo)
- CSS Puro (Glassmorphism e Dark Mode)
- Axios

**APIs Externas Integradas:**
- [REST Countries](https://restcountries.com/): Para bandeiras, brasões e dados oficiais dos países.
- [Open-Meteo](https://open-meteo.com/): Para previsão do tempo e clima em tempo real (gratuita, sem necessidade de API key).

---

## Pré-requisitos

Certifique-se de ter os seguintes programas instalados em sua máquina:
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [PostgreSQL](https://www.postgresql.org/) (rodando localmente ou em nuvem)

---

## Passo a Passo para Rodar o Projeto

Este repositório está dividido em duas pastas principais: `backend` e `frontend`.

### 1. Configurando o Backend

1. Abra um terminal e navegue até a pasta do backend:
   ```bash
   cd backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o banco de dados:
   - Na pasta `backend`, crie ou edite um arquivo chamado `.env`.
   - Adicione a sua string de conexão do PostgreSQL e a chave JWT:
     ```env
     DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
     JWT_SECRET="sua-chave-secreta-muito-segura"
     PORT=3001
     ```

4. Rode as migrations do Prisma para criar as tabelas no banco de dados:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Inicie o servidor backend (rodará em `http://localhost:3001`):
   ```bash
   npm run dev
   ```

### 2. Configurando o Frontend

1. Abra um **novo terminal** (mantenha o backend rodando) e navegue até a pasta do frontend:
   ```bash
   cd frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor frontend:
   ```bash
   npm run dev
   ```

4. Acesse a aplicação no seu navegador: `http://localhost:5173`

---

## Como testar a aplicação

1. Ao abrir o frontend, clique em "Cadastre-se" para criar o seu primeiro usuário.
2. Faça o login com o email e senha criados.
3. Cadastre novos Continentes, Países e Cidades pelas telas de gerenciamento.
4. Acesse a aba "APIs Externas" para consultar dados de qualquer país do mundo (em inglês, ex: *Brazil*, *Japan*) e o clima de qualquer cidade.

## Visualizando o Banco de Dados
Você pode visualizar e gerenciar os dados salvos diretamente pelo navegador usando o Prisma Studio. Com o backend rodando, abra um terminal na pasta `backend` e digite:
```bash
npx prisma studio
```
Isso abrirá uma interface web (geralmente em `http://localhost:5555`) com todas as tabelas do seu sistema.
