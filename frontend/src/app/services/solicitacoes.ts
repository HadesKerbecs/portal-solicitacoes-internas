import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Solicitacao } from '../models/solicitacao';
import { FiltrosSolicitacao } from '../pages/solicitacoes/components/filtros/filtros';
import { environment } from '../../environments/environment';

export interface RespostaPaginada {
  count: number;
  next: string | null;
  previous: string | null;
  results: Solicitacao[];
}

export type Ordenacao = 'antiga' | 'recente';

@Injectable({
  providedIn: 'root',
})
export class SolicitacoesService {
  private readonly apiUrl = `${environment.apiUrl}/solicitacoes`;

  constructor(private http: HttpClient) {}

  listar(
    filtros?: FiltrosSolicitacao,
    pagina?: number,
    ordenacao: Ordenacao = 'antiga'
  ) {
    let params: any = {
      ...filtros,
      ordenacao,
    };

    if (pagina) {
      params.page = pagina;
    }

    return this.http.get<RespostaPaginada>(
      `${this.apiUrl}/`,
      { params }
    );
  }

  criar(dados: {
    titulo: string;
    descricao: string;
    categoria: string;
  }) {
    return this.http.post<Solicitacao>(
      `${this.apiUrl}/`,
      dados
    );
  }

  editar(
    id: number,
    dados: {
      titulo: string;
      descricao: string;
      categoria: string;
    },
  ) {
    return this.http.patch<Solicitacao>(
      `${this.apiUrl}/${id}/`,
      dados
    );
  }

  excluir(id: number) {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}/`
    );
  }

  alterarStatus(id: number, status: string) {
    return this.http.patch<Solicitacao>(
      `${this.apiUrl}/${id}/alterar_status/`,
      { status }
    );
  }
}