import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ToastTipo = 'sucesso' | 'erro' | 'info';

export interface Toast {
  mensagem: string;
  tipo: ToastTipo;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastSubject = new BehaviorSubject<Toast | null>(null);

  toast$ = this.toastSubject.asObservable();

  sucesso(mensagem: string): void {
    this.mostrar(mensagem, 'sucesso');
  }

  erro(mensagem: string): void {
    this.mostrar(mensagem, 'erro');
  }

  info(mensagem: string): void {
    this.mostrar(mensagem, 'info');
  }

  fechar(): void {
    this.toastSubject.next(null);
  }

  private mostrar(mensagem: string, tipo: ToastTipo): void {
    this.toastSubject.next({
      mensagem,
      tipo,
    });

    setTimeout(() => {
      this.fechar();
    }, 4000);
  }
}