from django.shortcuts import render
from rest_framework.decorators import action
from rest_framework import viewsets
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from .pagination import SolicitacaoPagination

from .models import Solicitacao
from .serializers import SolicitacaoSerializer, CadastroSerializer

class SolicitacaoViewSet(viewsets.ModelViewSet):
    serializer_class = SolicitacaoSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = SolicitacaoPagination

    def get_queryset(self):
        queryset = Solicitacao.objects.select_related('solicitante').all()
    
        categoria = self.request.query_params.get('categoria')
        status = self.request.query_params.get('status')
        titulo = self.request.query_params.get('titulo')
        data_inicio = self.request.query_params.get('data_inicio')
        data_fim = self.request.query_params.get('data_fim')
        ordenacao = self.request.query_params.get('ordenacao', 'antiga')

        if categoria:
            queryset = queryset.filter(categoria=categoria)

        if status:
            queryset = queryset.filter(status=status)

        if titulo:
            queryset = queryset.filter(titulo__icontains=titulo)

        if data_inicio:
            queryset = queryset.filter(created_at__date__gte=data_inicio)

        if data_fim:
            queryset = queryset.filter(created_at__date__lte=data_fim)

        if ordenacao == 'recente':
            queryset = queryset.order_by('-created_at')
        else:
            queryset = queryset.order_by('created_at')

        return queryset

    def perform_create(self, serializer):
        serializer.save(solicitante=self.request.user)

    def perform_update(self, serializer):
        solicitacao = self.get_object()

        if solicitacao.status != Solicitacao.Status.ABERTO:
            raise ValidationError(
                'A solicitação só pode ser editada quando estiver Aberto.'
            )

        serializer.save()

    def perform_destroy(self, instance):
        if instance.status != Solicitacao.Status.ABERTO:
            raise ValidationError(
                'A solicitação só pode ser excluída quando estiver Aberto.'
            )

        instance.delete()

    @action(detail=True, methods=['patch'])
    def alterar_status(self, request, pk=None):
        solicitacao = self.get_object()

        if solicitacao.status == Solicitacao.Status.CONCLUIDO:
            raise ValidationError(
                'Uma solicitação concluída não pode ter o status alterado.'
            )
        novo_status = request.data.get('status')

        if novo_status not in Solicitacao.Status.values:
            raise ValidationError('Status inválido.')

        solicitacao.status = novo_status
        solicitacao.save()

        return Response(SolicitacaoSerializer(solicitacao).data)

class CadastroView(APIView):
    permission_classes = []

    def post(self, request):
        serializer = CadastroSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            {'detail': 'Usuário criado com sucesso.'},
            status=status.HTTP_201_CREATED,
        )