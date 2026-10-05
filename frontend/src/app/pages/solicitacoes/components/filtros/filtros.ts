import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CATEGORIAS } from '../../../../constants/categorias';
import { STATUS } from '../../../../constants/status';
import { ToastService } from '../../../../services/toast';

export interface FiltrosSolicitacao {
  titulo: string;
  categoria: string;
  status: string;
  data_inicio: string;
  data_fim: string;
}

@Component({
  selector: 'app-filtros',
  imports: [FormsModule],
  templateUrl: './filtros.html',
  styleUrl: './filtros.css',
})
export class Filtros {
  @Output() filtrar = new EventEmitter<FiltrosSolicitacao>();

  titulo = '';
  categoria = '';
  status = '';
  data_inicio = '';
  data_fim = '';

  categorias = CATEGORIAS;
  statuses = STATUS;

  constructor(private toastService: ToastService) {}

  aplicarFiltros() {
    if (this.data_inicio && this.data_fim && this.data_fim < this.data_inicio) {
      this.toastService.erro('A data final não pode ser anterior à data inicial.');
      return;
    }

    this.filtrar.emit({
      titulo: this.titulo,
      categoria: this.categoria,
      status: this.status,
      data_inicio: this.data_inicio,
      data_fim: this.data_fim,
    });
  }

  limparFiltros() {
    this.titulo = '';
    this.categoria = '';
    this.status = '';
    this.data_inicio = '';
    this.data_fim = '';

    this.aplicarFiltros();
  }
}
