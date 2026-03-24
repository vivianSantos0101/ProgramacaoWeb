#  To-Do List Fullstack

 **Tecnologias Backend:** Python 3.x & Django
 **API:** Django REST Framework (DRF)
 **Frontend:** HTML5, CSS3 (Customizado) & JavaScript (Fetch API)
 **Banco de Dados:** SQLite (embutido)

---

## 🛠 Como rodar o projeto

### 1. Entrar na pasta do projeto

```bash
cd caminho/para/seu/projeto
```


### 2. Configurar o Ambiente Virtual (Venv)

Windows:
``` bash
python -m venv venv
.\venv\Scripts\activate 
```


Linux/Mac:
``` bash
python3 -m venv venv
source venv/bin/activate 
```

### 3. Instalar Dependências

pip install django djangorestframework django-cors-headers


### 4. Preparar o Banco de Dados
``` bash
python manage.py makemigrations
python manage.py migrate 
```


### 5. Iniciar o Servidor

``` bash
python manage.py runserver
```


### Agora, abra o seu navegador e acesse: 👉 http://127.0.0.1:8000/

### 📂 Estrutura de Pastas Principal 

```

├── core/          # Configurações do projeto (settings.py, urls.py)
├── tasks/         # App de tarefas (models, views, serializers)
├── static/        # Arquivos estáticos (CSS e JS)
│   ├── css/style.css
│   └── js/script.js
├── templates/     # Arquivos HTML
│   └── index.html
├── manage.py      # Utilitário de comando do Django
└── db.sqlite3     # Banco de dados

```

