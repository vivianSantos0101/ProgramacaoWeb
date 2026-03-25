from django.shortcuts import render, redirect
from rest_framework import viewsets
from .models import Task
from tasks.serializer import TaskSerializer 

def index(request):
    # LÓGICA ATUALIZADA: Busca e separa as tarefas por status (completed)
    tasks_pending = Task.objects.filter(completed=False)
    tasks_completed = Task.objects.filter(completed=True)
    
    # Envia as duas listas separadas para o nosso novo index.html
    return render(request, 'index.html', {
        'tasks_pending': tasks_pending, 
        'tasks_completed': tasks_completed
    })

def criar_tarefa(request):
    # Recebe o formulário e cria no banco
    if request.method == 'POST':
        titulo_recebido = request.POST.get('titulo')
        categoria_recebida = request.POST.get('categoria')
        
        if titulo_recebido and categoria_recebida:
            Task.objects.create(title=titulo_recebido, category=categoria_recebida)
            
    return redirect('index')

# API para o Checkbox (O JavaScript se comunica com esta classe via PATCH)
class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer