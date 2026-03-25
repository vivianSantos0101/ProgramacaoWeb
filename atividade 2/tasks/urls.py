from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Configuração da API via Django Rest Framework
router = DefaultRouter()
router.register(r'api/tarefas', views.TaskViewSet, basename='api-tarefa')

urlpatterns = [
    # ROTA DO FRONT-END (A página HTML)
    path('', views.index, name='index'), 
    
    # ROTA PARA O FORMULÁRIO HTML
    path('criar/', views.criar_tarefa, name='criar_tarefa'), 
    
    # ROTAS DO BACK-END (API JSON para o JavaScript se comunicar)
    path('', include(router.urls)), 
]