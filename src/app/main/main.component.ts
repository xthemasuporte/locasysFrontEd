import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  constructor(private serviceAuth: AuthService) {}
  sair() {
    this.serviceAuth.logout();
  }
}
