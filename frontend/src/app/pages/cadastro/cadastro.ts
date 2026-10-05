import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-cadastro',
  imports: [FormsModule, RouterLink],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {
  username = '';
  password = '';
  confirmarSenha = '';

  constructor(
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  cadastrar(): void {
    if (!this.username || !this.password || !this.confirmarSenha) {
      this.toastService.erro('Preencha todos os campos.');
      return;
    }

    if (this.password !== this.confirmarSenha) {
      this.toastService.erro('As senhas não coincidem.');
      return;
    }

    this.authService.cadastrar(this.username, this.password).subscribe({
      next: () => {
        this.toastService.sucesso('Usuário cadastrado com sucesso!');

        this.username = '';
        this.password = '';
        this.confirmarSenha = '';
      },

      error: (error) => {
        console.error('Erro ao cadastrar usuário:', error);

        if (error.error?.username) {
          this.toastService.erro('Esse usuário já existe.');
          return;
        }

        this.toastService.erro(
          error.error?.detail || 'Não foi possível realizar o cadastro.'
        );
      },
    });
  }
}