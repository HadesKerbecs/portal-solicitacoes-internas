import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SolicitacoesService } from '../../../../services/solicitacoes';
import { Solicitacao } from '../../../../models/solicitacao';
import { CATEGORIAS } from '../../../../constants/categorias';
import { ToastService } from '../../../../services/toast';

@Component({
  selector: 'app-formulario',
  imports: [FormsModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css',
})
export class Formulario {
  titulo = '';
  descricao = '';
  categoria = '';
  mensagemErro = '';

  categorias = CATEGORIAS;

  @Output() solicitacaoCriada = new EventEmitter<Solicitacao>();

  constructor(private solicitacoesService: SolicitacoesService, private toastService: ToastService) {}

  criarSolicitacao() {
    this.mensagemErro = '';

    if (!this.titulo.trim()) {
      this.mensagemErro = 'Informe o título da solicitação.';
      return;
    }

    if (!this.descricao.trim()) {
      this.mensagemErro = 'Informe a descrição da solicitação.';
      return;
    }

    if (!this.categoria) {
      this.mensagemErro = 'Selecione uma categoria.';
      return;
    }

    const novaSolicitacao = {
      titulo: this.titulo.trim(),
      descricao: this.descricao.trim(),
      categoria: this.categoria,
    };

    this.solicitacoesService.criar(novaSolicitacao).subscribe({
      next: (response) => {
        this.solicitacaoCriada.emit(response);

        this.titulo = '';
        this.descricao = '';
        this.categoria = '';

        this.toastService.sucesso('Solicitação criada com sucesso!')
      },
      error: (error) => {
        console.error('Erro ao criar solicitação:', error);
        this.toastService.erro(
          'Não foi possível criar a solicitação.'
        ); 
      },
    });
  }
}