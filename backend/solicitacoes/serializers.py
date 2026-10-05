from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Solicitacao

class SolicitanteSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class SolicitacaoSerializer(serializers.ModelSerializer):
    solicitante = SolicitanteSerializer(read_only=True)

    class Meta:
        model = Solicitacao
        fields = [
            'id',
            'titulo',
            'descricao',
            'categoria',
            'status',
            'solicitante',
            'created_at',
            'updated_at',
        ]
        read_only_fields = [
            'id',
            'status',
            'solicitante',
            'created_at',
            'updated_at',
        ]

class CadastroSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password']

    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
        )