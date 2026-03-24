from django.shortcuts import render, redirect
from rest_framework import viewsets
from .models import Task
from tasks.serializer import TaskSerializer 

def index(request):
    # Busca e envia as tarefas para o HTML
    tarefas = Task.objects.all()
    return render(request, 'index.html', {'tarefas': tarefas})

def criar_tarefa(request):
    # Recebe o formulário e cria no banco
    if request.method == 'POST':
        titulo_recebido = request.POST.get('titulo')
        categoria_recebida = request.POST.get('categoria')
        
        if titulo_recebido and categoria_recebida:
            Task.objects.create(title=titulo_recebido, category=categoria_recebida)
            
    return redirect('index')

# API para o Checkbox
class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer