import { Component, OnInit } from '@angular/core';
import { IFilme } from '../interfaces/IFilme';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-alugar-filme',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alugar-filme.component.html',
  styleUrl: './alugar-filme.component.scss',
})
export class AlugarFilmeComponent implements OnInit {
  constructor(private serviceApi: ApiService) {}
  filmesDisponiveis: IFilme[] = [];
  filmeSelecionado: string = '';
  diasLocacao: number = 0;
  isLoadingLista: boolean = false;
  isLoadingEfetivando: boolean = false;
  ngOnInit(): void {
    this.listaFilmesDisponiveis();
  }

  listaFilmesDisponiveis() {
    this.isLoadingLista = true;
    this.serviceApi.getFilmesDisponiveis().subscribe({
      next: (data: any) => {
        this.filmesDisponiveis = data.items;
      },
      complete: () => {
        this.isLoadingLista = false;
      },
    });
  }

  efetivarLocacao() {
    if (this.filmeSelecionado == '' || this.diasLocacao <= 0) {
      alert(
        'Você precisa escolher um filme e um período maior do que zero para locação'
      );
      return;
    }
    this.isLoadingEfetivando = true;
    this.serviceApi
      .locacaoDeFilme(this.filmeSelecionado, this.diasLocacao)
      .subscribe({
        next: (data: any) => {
          alert('Filme Locado com Sucesso');
          this.listaFilmesDisponiveis();
          this.filmeSelecionado = '';
          this.diasLocacao = 0;
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
