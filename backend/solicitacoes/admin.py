from django.contrib import admin
from .models import Solicitacao

@admin.register(Solicitacao)
class SolicitacaoAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'titulo',
        'categoria',
        'status',
        'solicitante',
        'created_at',
    )
    list_filter = (
        'categoria',
        'status',
    )
    search_fields = (
        'titulo',
        'descricao',
    )
