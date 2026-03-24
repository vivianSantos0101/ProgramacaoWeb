from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views


router = DefaultRouter()
router.register(r'api/tarefas', views.TaskViewSet, basename='api-tarefa')

urlpatterns = [
   
    # ROTAS DO FRONT-END (HTML)
  
    path('', views.index, name='index'), # Sua página inicial
    path('criar/', views.criar_tarefa, name='criar_tarefa'), # A ponte para salvar no banco
    
   
    # ROTAS DO BACK-END (API JSON)
  
    path('', include(router.urls)), # Deixa o Django Rest Framework criar as rotas de API sozinho
]