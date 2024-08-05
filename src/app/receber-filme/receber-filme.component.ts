import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { IFilme } from '../interfaces/IFilme';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-receber-filme',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './receber-filme.component.html',
  styleUrl: './receber-filme.component.scss',
})
export class ReceberFilmeComponent implements OnInit {
  constructor(private serviceApi: ApiService) {}
  filmesAlugados: IFilme[] = [];
  filmeSelecionado: string = '';
  isLoadingLista: boolean = false;
  isLoadingEfetivando: boolean = false;
  ngOnInit(): void {
    this.listaFilmesAlugados();
  }

  listaFilmesAlugados() {
    this.isLoadingLista = true;
    this.serviceApi.getFilmesAlugados().subscribe({
      next: (data: any) => {
        this.filmesAlugados = data.items;
      },
      complete: () => {
        this.isLoadingLista = false;
      },
    });
  }

  efetivarDevolucao() {
    if (this.filmeSelecionado == '') {
      alert('Você precisa escolher um filme para devolução');
      return;
    }
    this.isLoadingEfetivando = true;
    this.serviceApi.devolucaoDeFilme(this.filmeSelecionado).subscribe({
      next: (data: any) => {
        alert('Filme Locado com Sucesso');
        this.listaFilmesAlugados();
        this.filmeSelecionado = '';
      },
      error: (error) => {
        alert('Ocorreu um erro ao Locar o Filme');
      },
      complete: () => {
        this.isLoadingEfetivando = false;
      },
    });
  }
}
