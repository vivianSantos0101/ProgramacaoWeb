#  To-Do List Fullstack foco em Java Script ( materia de Prog. Web - André Olimpio)


 **Tecnologias Backend:**  Python 3.x & Django;

 **API:**  Django REST Framework (DRF);

 **Frontend:**  HTML5, CSS3 (Customizado) & JavaScript (Fetch API);

 **Banco de Dados:**  SQLite (embutido).

---

## 🛠 Como rodar o projeto:

### 1. Clonar projeto:

```bash
git clone https://github.com/vivianSantos0101/ProgramacaoWeb.git

```

### 1.1 Entrar na pasta do projeto

```bash
cd caminho/para/seu/projeto
```

### 2. Configurar o Ambiente Virtual (Venv)

para Windows use:
``` bash
python -m venv venv
.\venv\Scripts\activate 
```

para Linux/Mac use:
``` bash
python3 -m venv venv
source venv/bin/activate 
```

### 3. Instalar Dependências

```bash 
pip install django djangorestframework django-cors-headers
```

### 3.1 update no pip, normalmente aparece o codigo acima em verde, caso não:

``` bash 
python -m pip install --upgrade pip   
```

### 4. Preparar o Banco de Dados
``` bash
python manage.py makemigrations
```

``` bash
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
│   └── js/script.js  #FOCO DA MATERIA DE PROG. WEB
├── templates/     # Arquivos HTML
│   └── index.html
├── manage.py      # Utilitário de comando do Django
└── db.sqlite3     # Banco de dados 

```

