import { Component, OnInit } from '@angular/core';
import { IFilme } from '../interfaces/IFilme';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  isLoadingAlugados: boolean = false;
  isLoadingDisponiveis: boolean = false;
  isLoadingIndisponiveis: boolean = false;
  isLoadingGerandoCSV: boolean = false;
  constructor(private serviceApi: ApiService) {}
  ngOnInit(): void {
    this.isLoadingAlugados = true;
    this.isLoadingDisponiveis = true;
    this.isLoadingIndisponiveis = true;
    this.serviceApi.getFilmesAlugados().subscribe({
      next: (data: any) => {
        this.filmesAlugados = data.items;
      },
      complete: () => {
        this.isLoadingAlugados = false;
      },
    });
    this.serviceApi.getFilmesDisponiveis().subscribe({
      next: (data: any) => {
        this.filmesDisponiveis = data.items;
      },
      complete: () => {
        this.isLoadingDisponiveis = false;
      },
    });
    this.serviceApi.getFilmesIndisponiveis().subscribe({
      next: (data: any) => {
        this.filmesIndisponiveis = data.items;
      },
      complete: () => {
        this.isLoadingIndisponiveis = false;
      },
    });
  }
  filmesAlugados: IFilme[] = [];
  filmesDisponiveis: IFilme[] = [];
  filmesIndisponiveis: IFilme[] = [];

  exportToCSV(lista: IFilme[], nome: string) {
    this.isLoadingGerandoCSV = true;
    let linhas =
      'codigo;titulo;genero;quantidade;quantidade alugada;quantidade disponivel';
    for (let i = 0; i < lista.length; i++) {
      linhas += '\r\n';
      linhas += `${lista[i].codigo};${lista[i].titulo};${lista[i].categoria};${
        lista[i].quantidade
      };${lista[i].quantidade - lista[i].quantidade_disponivel};${
        lista[i].quantidade_disponivel
      }`;
    }

    const blob = new Blob([linhas], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nome;
    a.click();
    window.URL.revokeObjectURL(url);
    this.isLoadingGerandoCSV = false;
  }
}
