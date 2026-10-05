import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SolicitacoesService } from '../../../../services/solicitacoes';
import { Solicitacao } from '../../../../models/solicitacao';
import { CATEGORIAS } from '../../../../constants/categorias';
import { ToastService } from '../../../../services/toast';

@Component({
  selector: 'app-editar',
  imports: [FormsModule],
  templateUrl: './editar.html',
  styleUrl: './editar.css',
})
export class Editar implements OnChanges {
  @Input() solicitacao: Solicitacao | null = null;

  @Output() salvo = new EventEmitter<Solicitacao>();
  @Output() cancelado = new EventEmitter<void>();

  titulo = '';
  descricao = '';
  categoria = '';

  categorias = CATEGORIAS;

  constructor(
    private solicitacoesService: SolicitacoesService,
    private toastService: ToastService,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['solicitacao'] && this.solicitacao) {
      this.titulo = this.solicitacao.titulo;
      this.descricao = this.solicitacao.descricao;
      this.categoria = this.solicitacao.categoria;
    }
  }

  salvar() {
    if (!this.solicitacao) {
      return;
    }

    if (!this.titulo.trim()) {
      this.toastService.erro('Informe o título da solicitação.');
      return;
    }

    if (!this.descricao.trim()) {
      this.toastService.erro('Informe a descrição da solicitação.');
      return;
    }

    if (!this.categoria) {
      this.toastService.erro('Selecione uma categoria.');
      return;
    }

    const dadosAtualizados = {
      titulo: this.titulo.trim(),
      descricao: this.descricao.trim(),
      categoria: this.categoria,
    };

    this.solicitacoesService.editar(this.solicitacao.id, dadosAtualizados).subscribe({
      next: (response) => {
        this.toastService.sucesso('Solicitação atualizada com sucesso!');

        this.salvo.emit(response);
      },
      error: (error) => {
        console.error('Erro ao editar solicitação:', error);

        this.toastService.erro('Não foi possível editar a solicitação.');
      },
    });
  }

  cancelar() {
    this.cancelado.emit();
  }
}
