from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import SolicitacaoViewSet, CadastroView

router = DefaultRouter()

router.register(r'solicitacoes', SolicitacaoViewSet, basename='solicitacao')

urlpatterns = [
    path('auth/cadastro/', CadastroView.as_view(), name='cadastro'),
]

urlpatterns += router.urls