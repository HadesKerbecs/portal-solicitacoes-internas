import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { Solicitacoes } from './pages/solicitacoes/solicitacoes';
import { Dashboard } from './pages/dashboard/dashboard';
import { NovaSolicitacao } from './pages/nova-solicitacao/nova-solicitacao';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'cadastro',
    component: Cadastro,
  },
  {
    path: 'solicitacoes',
    component: Solicitacoes,
    canActivate: [authGuard],
  },
  {
    path: 'nova-solicitacao',
    component: NovaSolicitacao,
    canActivate: [authGuard],
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
