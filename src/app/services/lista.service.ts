import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ListaService {
  private classificacao = ['Livre', '12+', '14+', '16+', '18+'];
  private categorias = [
    'Ação',
    'Aventura',
    'Comédia',
    'Drama',
    'Fantasia',
    'Faroeste',
    'Ficção Científica',
    'Terror',
    'Mistério',
    'Romance',
    'Suspense',
    'Animação',
    'Biografia',
    'Documentário',
    'Família',
    'Guerra',
    'Histórico',
    'Musical',
    'Policial',
    'Esporte',
  ];

  constructor() {}

  get Categorias() {
    return this.categorias;
  }
  get Classificacoes() {
    return this.classificacao;
  }
}
