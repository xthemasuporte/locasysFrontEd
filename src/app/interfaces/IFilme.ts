export interface IFilme {
  _id: string;
  codigo: number;
  titulo: string;
  anoLancamento: number;
  categoria: string;
  quantidade: number;
  quantidade_disponivel: number;
  classificacaoIndicativa: string;
  imagem: string;
  diretor: string;
  elencoPrincipal: string;
  duracao: number;
}
