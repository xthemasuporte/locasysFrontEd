import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IFilme } from '../interfaces/IFilme';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  FiltrarLivros(filtro: any, pagina: number) {
    const params = new HttpParams().set('page', pagina.toString());
    return this.http.post(environment.apiUrl + '/v1/filmes', filtro, {
      params,
    });
  }

  getFilme(_id: string) {
    const params = new HttpParams().set('id', _id);
    return this.http.get(environment.apiUrl + '/v1/filme', { params });
  }

  updateFilme(filme: IFilme) {
    const params = new HttpParams().set('id', filme._id);
    return this.http.put(environment.apiUrl + '/v1/filme', filme, { params });
  }

  insertFilme(filme: IFilme) {
    return this.http.post(environment.apiUrl + '/v1/filme', filme);
  }

  getFilmesAlugados() {
    const params = new HttpParams().set('page', 1).set('limit', 9999);
    const filtro = {
      $expr: { $lt: ['$quantidade_disponivel', '$quantidade'] },
    };
    return this.http.post(environment.apiUrl + '/v1/filmes', filtro, {
      params,
    });
  }

  getFilmesDisponiveis() {
    const params = new HttpParams().set('page', 1).set('limit', 9999);
    const filtro = {
      $expr: { $gt: ['$quantidade_disponivel', 0] },
    };
    return this.http.post(environment.apiUrl + '/v1/filmes', filtro, {
      params,
    });
  }

  getFilmesIndisponiveis() {
    const params = new HttpParams().set('page', 1).set('limit', 9999);
    const filtro = {
      $expr: { $eq: ['$quantidade_disponivel', 0] },
    };
    return this.http.post(environment.apiUrl + '/v1/filmes', filtro, {
      params,
    });
  }

  locacaoDeFilme(id: string, qdtDias: number) {
    const params = new HttpParams().set('id', id);
    return this.http.put(
      environment.apiUrl + '/v1/filme/locacao',
      { qtdDias: qdtDias },
      {
        params,
      }
    );
  }

  devolucaoDeFilme(id: string) {
    const params = new HttpParams().set('id', id);
    return this.http.put(environment.apiUrl + '/v1/filme/devolucao', null, {
      params,
    });
  }
}
