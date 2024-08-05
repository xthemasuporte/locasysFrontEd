import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private serviceAuth: AuthService) {}

  username: string = '';
  password: string = '';

  login() {
    this.serviceAuth.login(this.username, this.password).subscribe({
      error: (httperror: any) => {
        console.log(httperror);
        try {
          alert(httperror.error.message);
          //this.messageService.add({key: 'tc', severity:'error', summary: 'Erro', detail: httperror.error.resposta.msg})
        } catch (error) {
          alert('Erro de Comunicação com Servidor');
          //this.messageService.add({key: 'tc', severity:'error', summary: 'Erro', detail: "Erro de Comunicação com Servidor"})
        }
      },
    });
  }
}
