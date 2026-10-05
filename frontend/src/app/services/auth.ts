import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ToastService } from './toast';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

interface LoginResponse {
  access: string;
  refresh: string;
}

interface CadastroResponse {
  detail: string;
}

interface JwtPayload {
  exp: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth`;

  private avisoTimer?: ReturnType<typeof setTimeout>;
  private expiracaoTimer?: ReturnType<typeof setTimeout>;

  constructor(
    private http: HttpClient,
    private toastService: ToastService,
    private router: Router,
  ) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login/`, {
        username,
        password,
      })
      .pipe(
        tap((response) => {
          localStorage.setItem('access_token', response.access);
          localStorage.setItem('refresh_token', response.refresh);
          localStorage.setItem('username', username);

          this.iniciarControleSessao(response.access);
        }),
      );
  }

  private iniciarControleSessao(token: string): void {
    const payload = jwtDecode<JwtPayload>(token);

    const agora = Date.now();
    const expiracao = payload.exp * 1000;

    const tempoRestante = expiracao - agora;

    const tempoParaAviso = tempoRestante - 2 * 60 * 1000;

    if (tempoParaAviso > 0) {
      this.avisoTimer = setTimeout(() => {
        this.toastService.info('Sua sessão expirará em 2 minutos. Salve seu trabalho.');
      }, tempoParaAviso);
    }

    if (tempoRestante > 0) {
      this.expiracaoTimer = setTimeout(() => {
        this.logout(true);
      }, tempoRestante);
    } else {
      this.logout(true);
    }
  }

  cadastrar(username: string, password: string): Observable<CadastroResponse> {
    return this.http.post<CadastroResponse>(`${this.apiUrl}/cadastro/`, {
      username,
      password,
    });
  }

  logout(expirada = false): void {
    if (this.avisoTimer) {
      clearTimeout(this.avisoTimer);
    }

    if (this.expiracaoTimer) {
      clearTimeout(this.expiracaoTimer);
    }

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    if (expirada) {
      this.toastService.erro('Sua sessão expirou. Faça login novamente.');
    }

    this.router.navigate(['/login']);
  }
}
