import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { ListaFilmesComponent } from './lista-filmes/lista-filmes.component';
import { CadastroFilmeComponent } from './cadastro-filme/cadastro-filme.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlugarFilmeComponent } from './alugar-filme/alugar-filme.component';
import { ReceberFilmeComponent } from './receber-filme/receber-filme.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainComponent,

    canActivateChild: [authGuard],
    canActivate: [authGuard],
    children: [
      { path: 'filme/lista', component: ListaFilmesComponent },
      { path: 'filme/cadastro/:id', component: CadastroFilmeComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'alugarFilme', component: AlugarFilmeComponent },
      { path: 'receberFilme', component: ReceberFilmeComponent },
    ],
  },
];
