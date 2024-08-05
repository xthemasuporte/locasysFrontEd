import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IFilme } from '../interfaces/IFilme';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-filmes',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './lista-filmes.component.html',
  styleUrl: './lista-filmes.component.scss',
})
export class ListaFilmesComponent implements OnInit {
  @ViewChild('inputFiltro') inputFiltro!: ElementRef;

  constructor(private service: ApiService) {}

  filmes: IFilme[] = [];
  filtro: string = 'Nome';
  filtroText: string = '';

  totalItens: number = 0;
  totalPaginas: number = 0;
  paginaAtual: number = 1;

  isLoading: boolean = false;

  changeFiltro(filtro: string) {
    this.filtro = filtro;
    this.inputFiltro.nativeElement.focus();
    this.filtroText = '';
  }

  consultarLivros(pagina: number) {
    this.paginaAtual = pagina;
    let query: any;
    query = { titulo: { $regex: this.filtroText, $options: 'i' } };
    if (this.filtro != 'Nome') {
      query = { codigo: parseInt(this.filtroText) };
    }
    this.isLoading = true;
    this.filmes = [];
    this.service.FiltrarLivros(query, this.paginaAtual).subscribe({
      next: (data: any) => {
        this.filmes = data.items;
        this.totalPaginas = data.paginas;
      },
      error: (err) => {
        alert('Ocorreu um Erro ao Listar os Filmes');
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.consultarLivros(this.paginaAtual);
  }
}
