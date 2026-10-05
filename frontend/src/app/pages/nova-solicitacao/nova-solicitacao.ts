import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Formulario } from './components/formulario/formulario';
import { Sidebar } from '../sidebar/sidebar';
import { Solicitacao } from '../../models/solicitacao';

@Component({
  selector: 'app-nova-solicitacao',
  imports: [Sidebar, Formulario],
  templateUrl: './nova-solicitacao.html',
  styleUrl: './nova-solicitacao.css',
})
export class NovaSolicitacao {
  constructor(private router: Router) {}

  solicitacaoCriada(solicitacao: Solicitacao): void {
    this.router.navigate(['/solicitacoes']);
  }
}