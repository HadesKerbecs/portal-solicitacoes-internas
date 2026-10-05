import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router,
  ) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.toastService.sucesso('Login realizado com sucesso!');

        this.router.navigate(['/solicitacoes']);
      },
      error: (error) => {
        console.error('Erro ao realizar login:', error);

        if (error.status === 401) {
          this.toastService.erro('Usuário ou senha inválidos.');
          return;
        }

        this.toastService.erro('Não foi possível realizar o login. Tente novamente.');
      },
    });
  }
}
