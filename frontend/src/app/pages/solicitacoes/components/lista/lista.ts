import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Solicitacao } from '../../../../models/solicitacao';
import { getCategoriaLabel } from '../../../../constants/categorias';
import { getStatusLabel } from '../../../../constants/status';

@Component({
  selector: 'app-lista',
  imports: [DatePipe],
  templateUrl: './lista.html',
  styleUrl: './lista.css',
})
export class Lista {
  @Input() solicitacoes: Solicitacao[] = [];
  @Input() paginaAtual = 1;
  @Input() totalPaginas = 1;

  @Output() editar = new EventEmitter<Solicitacao>();
  @Output() excluir = new EventEmitter<Solicitacao>();
  @Output() alterarStatus = new EventEmitter<Solicitacao>();
  @Output() detalhes = new EventEmitter<Solicitacao>();
  @Output() mudarPagina = new EventEmitter<number>();

  editarSolicitacao(solicitacao: Solicitacao) {
    this.editar.emit(solicitacao);
  }

  getCategoriaLabel(value: string): string {
    return getCategoriaLabel(value);
  }

  selecionarStatus(solicitacao: Solicitacao) {
    this.alterarStatus.emit(solicitacao);
  }

  getStatusLabel(value: string): string {
    return getStatusLabel(value);
  }

  irParaPagina(pagina: number) {
    if (pagina < 1 || pagina > this.totalPaginas || pagina === this.paginaAtual){
      return
    }
    this.mudarPagina.emit(pagina);
  }
}