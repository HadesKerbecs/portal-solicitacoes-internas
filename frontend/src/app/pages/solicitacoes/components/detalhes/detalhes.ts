import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Solicitacao } from '../../../../models/solicitacao';
import { getCategoriaLabel } from '../../../../constants/categorias';
import { getStatusLabel } from '../../../../constants/status';

@Component({
  selector: 'app-detalhes',
  imports: [CommonModule],
  templateUrl: './detalhes.html',
  styleUrl: './detalhes.css',
})
export class Detalhes {
  @Input() solicitacao: Solicitacao | null = null;

  @Output() fechar = new EventEmitter<void>();

  getCategoriaLabel(value: string): string {
    return getCategoriaLabel(value);
  }

  getStatusLabel(value: string): string {
    return getStatusLabel(value);
  }

  getSolicitante(): string {
    return this.solicitacao?.solicitante?.username ?? '-';
  }

  fecharDetalhes() {
    this.fechar.emit();
  }
}
