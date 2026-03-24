📝 To-Do List Fullstack (Django + JS)
Um gerenciador de tarefas simples, funcional e moderno, desenvolvido para fins de aprendizado de integração entre Django REST Framework e JavaScript Assíncrono.

🚀 Tecnologias
Backend: Python 3.x & Django

API: Django REST Framework (DRF)

Frontend: HTML5, CSS3 (Customizado) & JavaScript (Fetch API)

Banco de Dados: SQLite (embutido)

🛠️ Como rodar o projeto
Siga os passos abaixo para configurar o ambiente e executar a aplicação em sua máquina local.

1. Clonar ou criar a pasta do projeto
Bash
cd caminho/para/seu/projeto
2. Configurar o Ambiente Virtual (Venv)
Windows:

Bash
python -m venv venv
.\venv\Scripts\activate
Linux/Mac:

Bash
python3 -m venv venv
source venv/bin/activate
3. Instalar Dependências
Bash
pip install django djangorestframework django-cors-headers
4. Preparar o Banco de Dados
Bash
python manage.py makemigrations
python manage.py migrate
5. Iniciar o Servidor
Bash
python manage.py runserver
Agora, abra o seu navegador e acesse:
👉 http://127.0.0.1:8000/

📂 Estrutura de Pastas Principal
Plaintext
├── core/              # Configurações do projeto (settings.py, urls.py)
├── tasks/             # App de tarefas (models, views, serializers)
├── static/            # Arquivos estáticos (CSS e JS)
│   ├── css/style.css
│   └── js/script.js
├── templates/         # Arquivos HTML
│   └── index.html
└── manage.py          # Utilitário de comando do Django
📌 Funcionalidades implementadas
[x] Listagem de tarefas por categorias (Estudos, Trabalho, Casa).

[x] API RESTful retornando JSON.

[x] Interface com paleta de cores azul e design em cards.

[x] Separação de responsabilidades (Front e Back).

Desenvolvido por Vivian Oliveira, 4 ADS