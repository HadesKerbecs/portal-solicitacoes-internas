import { Component, signal } from '@angular/core';
import { SolicitacoesService } from '../../services/solicitacoes';
import { Lista } from './components/lista/lista';
import { Solicitacao } from '../../models/solicitacao';
import { Editar } from './components/editar/editar';
import { Excluir } from './components/excluir/excluir';
import { Status } from './components/status/status';
import { Filtros, FiltrosSolicitacao } from './components/filtros/filtros';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { Detalhes } from './components/detalhes/detalhes';

@Component({
  selector: 'app-solicitacoes',
  imports: [Lista, Editar, Excluir, Status, Filtros, Sidebar, Detalhes],
  templateUrl: './solicitacoes.html',
  styleUrl: './solicitacoes.css',
})
export class Solicitacoes {
  solicitacoes = signal<Solicitacao[]>([]);
  paginaAtual = signal(1);
  totalPaginas = signal(1);
  solicitacaoSelecionada: Solicitacao | null = null;
  solicitacaoExcluindo: Solicitacao | null = null;
  solicitacaoStatus: Solicitacao | null = null;
  solicitacaoDetalhes: Solicitacao | null = null;

  constructor(
    private solicitacoesService: SolicitacoesService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.buscarSolicitacoes();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  buscarSolicitacoes(pagina = 1) {
    this.solicitacoesService.listar(undefined, pagina, 'antiga').subscribe({
      next: (response) => {
        this.solicitacoes.set(response.results);

        this.paginaAtual.set(pagina);
        this.totalPaginas.set(Math.ceil(response.count / 10));
      },
      error: (error) => {
        console.error('Erro ao carregar solicitações:', error);
      },
    });
  }

  mudarPagina(pagina: number) {
    this.buscarSolicitacoes(pagina);
  }

  editarSolicitacao(solicitacao: Solicitacao) {
    this.solicitacaoSelecionada = solicitacao;
  }

  solicitacaoEditada(solicitacao: Solicitacao) {
    this.solicitacoes.update((solicitacoes) =>
      solicitacoes.map((item) => (item.id === solicitacao.id ? solicitacao : item)),
    );

    this.solicitacaoSelecionada = null;
  }

  cancelarEdicao() {
    this.solicitacaoSelecionada = null;
  }

  excluirSolicitacao(solicitacao: Solicitacao) {
    if (solicitacao.status !== 'ABERTO') {
      return;
    }

    this.solicitacaoExcluindo = solicitacao;
  }

  solicitacaoExcluida(id: number) {
    this.solicitacoes.update((solicitacoes) =>
      solicitacoes.filter((solicitacao) => solicitacao.id !== id),
    );

    this.solicitacaoExcluindo = null;
  }

  cancelarExclusao() {
    this.solicitacaoExcluindo = null;
  }

  alterarStatus(solicitacao: Solicitacao) {
    this.solicitacaoStatus = solicitacao;
  }

  statusAlterado(solicitacao: Solicitacao) {
    this.solicitacoes.update((solicitacoes) =>
      solicitacoes.map((item) => (item.id === solicitacao.id ? solicitacao : item)),
    );

    this.solicitacaoStatus = null;
  }

  aplicarFiltros(filtros: FiltrosSolicitacao) {
    this.solicitacoesService.listar(filtros, 1, 'antiga').subscribe({
      next: (response) => {
        this.solicitacoes.set(response.results);

        this.paginaAtual.set(1);
        this.totalPaginas.set(Math.ceil(response.count / 10));
      },
      error: (error) => {
        console.error('Erro ao filtrar solicitações:', error);
      },
    });
  }

  verDetalhes(solicitacao: Solicitacao) {
    this.solicitacaoDetalhes = solicitacao;
  }

  fecharDetalhes() {
    this.solicitacaoDetalhes = null;
  }
}
