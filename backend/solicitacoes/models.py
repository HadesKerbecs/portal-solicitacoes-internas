from django.db import models
from django.contrib.auth.models import User


class Solicitacao(models.Model):

    class Categoria(models.TextChoices):
        TI = 'TI', 'TI'
        RH = 'RH', 'RH'
        COMPRAS = 'COMPRAS', 'Compras'
        FINANCEIRO = 'FINANCEIRO', 'Financeiro'
        INFRAESTRUTURA = 'INFRAESTRUTURA', 'Infraestrutura'

    class Status(models.TextChoices):
        ABERTO = 'ABERTO', 'Aberto'
        EM_ATENDIMENTO = 'EM_ATENDIMENTO', 'Em Atendimento'
        CONCLUIDO = 'CONCLUIDO', 'Concluído'

    titulo = models.CharField(max_length=200)
    descricao = models.TextField()
    categoria = models.CharField(
        max_length=20,
        choices=Categoria.choices
    )
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.ABERTO
    )
    solicitante = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name='solicitacoes'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.titulo