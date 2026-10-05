import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';

import { SolicitacoesService } from '../../services/solicitacoes';
import { Solicitacao } from '../../models/solicitacao';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-dashboard',
  imports: [Sidebar, CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  totalSolicitacoes = signal(0);
  solicitacoesAbertas = signal(0);
  solicitacoesEmAtendimento = signal(0);
  solicitacoesConcluidas = signal(0);

  ultimasSolicitacoes = signal<Solicitacao[]>([]);

  constructor(private solicitacoesService: SolicitacoesService) {}

  ngOnInit(): void {
    this.carregarIndicadores();
  }

  carregarIndicadores(): void {
    forkJoin({
      todas: this.solicitacoesService.listar(undefined, 1, 'recente'),

      abertas: this.solicitacoesService.listar(
        {
          titulo: '',
          categoria: '',
          status: 'ABERTO',
          data_inicio: '',
          data_fim: '',
        },
        1,
        'recente',
      ),

      emAtendimento: this.solicitacoesService.listar(
        {
          titulo: '',
          categoria: '',
          status: 'EM_ATENDIMENTO',
          data_inicio: '',
          data_fim: '',
        },
        1,
        'recente',
      ),

      concluidas: this.solicitacoesService.listar(
        {
          titulo: '',
          categoria: '',
          status: 'CONCLUIDO',
          data_inicio: '',
          data_fim: '',
        },
        1,
        'recente',
      ),
    }).subscribe({
      next: (response) => {
        this.totalSolicitacoes.set(response.todas.count);

        this.solicitacoesAbertas.set(response.abertas.count);

        this.solicitacoesEmAtendimento.set(response.emAtendimento.count);

        this.solicitacoesConcluidas.set(response.concluidas.count);

        this.ultimasSolicitacoes.set(response.todas.results.slice(0, 5));
      },

      error: (error) => {
        console.error('Erro ao carregar indicadores:', error);
      },
    });
  }
}
