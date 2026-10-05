import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SolicitacoesService } from '../../../../services/solicitacoes';
import { Solicitacao } from '../../../../models/solicitacao';
import { STATUS, getStatusLabel } from '../../../../constants/status';
import { ToastService } from '../../../../services/toast';

@Component({
  selector: 'app-status',
  imports: [FormsModule],
  templateUrl: './status.html',
  styleUrl: './status.css',
})
export class Status {
  @Input() solicitacao: Solicitacao | null = null;

  @Output() alterado = new EventEmitter<Solicitacao>();

  novoStatus = '';

  statuses = STATUS;

  constructor(
    private solicitacoesService: SolicitacoesService,
    private toastService: ToastService,
  ) {}

  getStatusLabel(value: string): string {
    return getStatusLabel(value);
  }

  alterarStatus() {
    if (!this.solicitacao) {
      return;
    }

    if (!this.novoStatus) {
      this.toastService.erro('Selecione um status.');
      return;
    }

    this.solicitacoesService
      .alterarStatus(this.solicitacao.id, this.novoStatus)
      .subscribe({
        next: (response) => {
          this.toastService.sucesso(
            'Status atualizado com sucesso!',
          );

          this.alterado.emit(response);
          this.novoStatus = '';
        },
        error: (error) => {
          console.error('Erro ao alterar status:', error);

          this.toastService.erro(
            'Não foi possível alterar o status.',
          );
        },
      });
  }
}