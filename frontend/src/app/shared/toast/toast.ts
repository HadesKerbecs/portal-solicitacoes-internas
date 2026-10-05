import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast implements OnDestroy {
  mensagem = '';
  tipo: 'sucesso' | 'erro' | 'info' = 'info';

  private subscription: Subscription;

  constructor(
    private toastService: ToastService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.subscription = this.toastService.toast$.subscribe((toast) => {
      if (toast) {
        this.mensagem = toast.mensagem;
        this.tipo = toast.tipo;
      } else {
        this.mensagem = '';
      }

      this.changeDetectorRef.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
