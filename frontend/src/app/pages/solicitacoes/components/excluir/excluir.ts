import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Solicitacao } from '../../../../models/solicitacao';
import { SolicitacoesService } from '../../../../services/solicitacoes';
import { ToastService } from '../../../../services/toast';

@Component({
  selector: 'app-excluir',
  imports: [],
  templateUrl: './excluir.html',
  styleUrl: './excluir.css',
})
export class Excluir {
  @Input() solicitacao: Solicitacao | null = null;

  @Output() excluido = new EventEmitter<number>();
  @Output() cancelado = new EventEmitter<void>();

  constructor(
    private solicitacoesService: SolicitacoesService,
    private toastService: ToastService
  ) {}

  excluir() {
    if (!this.solicitacao) {
      return;
    }

    this.solicitacoesService.excluir(this.solicitacao.id).subscribe({
      next: () => {
        this.toastService.sucesso(
          'Solicitação excluída com sucesso!'
        );

        this.excluido.emit(this.solicitacao!.id);
      },
      error: (error) => {
        console.error('Erro ao excluir solicitação:', error);

        this.toastService.erro(
          'Não foi possível excluir a solicitação.'
        );
      },
    });
  }

  cancelar() {
    this.cancelado.emit();
  }
}