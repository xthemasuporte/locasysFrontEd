import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ListaService } from '../services/lista.service';
import { IFilme } from '../interfaces/IFilme';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro-filme',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cadastro-filme.component.html',
  styleUrl: './cadastro-filme.component.scss',
})
export class CadastroFilmeComponent implements OnInit {
  //@ViewChild('inputFiltro') inputFiltro!: ElementRef;
  @ViewChild('inputImage') inputImage!: ElementRef;

  filme: IFilme = {
    _id: '',
    codigo: 0,
    titulo: '',
    anoLancamento: 0,
    categoria: 'Selecione',
    quantidade: 0,
    quantidade_disponivel: 0,
    classificacaoIndicativa: '',
    diretor: '',
    elencoPrincipal: '',

    duracao: 0,
    imagem:
      'data:image/png;base64,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IIiQBYAgQhYAgghZAAgiZAEgiJAFgCBCFgCCCFkACCJkASCIkAWAIEIWAIIIWQAIImQBIIiQBYAgQhYAgghZAAgiZAEgiJAFgCBCFgCCCFkACCJkASCIkAWAIEIWAIIIWQAIImQBIIiQBYAgQhYAgghZAAgiZAEgiJAFgCBCFgCCCFkACCJkASCIkAWAIEIWAIIIWQAIImQBIIiQBYAgQhYAgghZAAgiZAEgiJAFgCBCFgCCCFkACCJkASCIkAWAIEIWAIIIWQAIImQBIIiQBYAgQhYAgghZAAgiZAEgiJAFgCBCFgCCCFkACCJkASCIkAWAIEIWAIIIWQAIImQBIIiQBYAgQhYAgghZAAgiZAEgiJAFgCBCFgCCCFkACCJkASCIkAWAIEIWAIIIWQAIImQBIIiQBYAgQhYAgghZAAgiZAEgiJAFgCBCFgCCCFkACCJkASCIkAWAIEIWAIIIWQAIImQBIIiQBYAgQhYAgghZAAgiZAEgiJAFgCBCFgCCCFkACCJkASCIkAWAIEIWAIIIWQAIImQBIIiQBYAgQhYAgghZAAgiZAEgiJAFgCBCFgCCCFkACCJkASCIkAWAIEIWAIIIWQAIImQBIIiQBYAgQhYAgghZAAgiZAEgiJAFgCBCFgCCCFkACCJkASCIkAWAIEIWAIIIWQAIImQBIIiQBYAgQhYAgghZAAgiZAEgiJAFgCBCFgCCCFkACCJkASCIkAWAIEIWAIIIWQAIImQBIIiQBYAgQhYAgghZAAgiZAEgiJAFgCBCFgCCCFkACCJkASCIkAWAIEIWAIIIWQAIImQBIIiQBYAgQhYAgghZAAgiZAEgiJAFgCBCFgCCCFkACCJkASCIkAWAIEIWAIIIWQAIImQBIIiQBYAgQhYAgghZAAgiZAEgiJAFgCBCFgCCCFkACCJkASCIkAWAIEIWAIIIWQAIImQBIIiQBYAgQhYAgghZAAgiZAEgiJAFgCBCFgCCCFkACCJkASCIkAWAIEIWAIIIWQAIImQBIIiQBYAgQhYAgghZAAgiZAEgiJAFgCBCFgCCCFkACCJkASCIkAWAIEIWAIIIWQAIImQBIIiQBYAgQhYAgghZAAgiZAEgiJAFgCBCFgCCCFkACCJkASCIkAWAIEIWAIIIWQAIImQBIIiQBYAgQhYAgghZAAgiZAEgiJAFgCBCFgCCCFkACCJkASCIkAWAIEIWAIIIWQAIImQBIIiQBYAgQhYAgghZAAgiZAEgiJAFgCBCFgCCCFkACCJkASCIkAWAIEIWAIIIWQAIImQBIMiXWnnRJ598kv73f/83el0A4EBbXV1t6/VHUkqbMasCAIeb5mIACCJkASCIkAWAIEIWAIIIWQAIImQBIIiQBYAgQhYAgghZAAgiZAEgyP8DbalcbxNQWf0AAAAASUVORK5CYII=',
  };

  isLoading: boolean = false;
  categorias: string[] = [];
  classificacoes: string[] = [];
  constructor(
    private serviceListas: ListaService,
    private serviceAPI: ApiService,
    private route: ActivatedRoute
  ) {
    this.categorias = this.serviceListas.Categorias;
    this.classificacoes = this.serviceListas.Classificacoes;
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.filme._id = params.get('id') || '0';
      console.log(this.filme);
      if (this.filme._id != '0') {
        this.serviceAPI.getFilme(this.filme._id).subscribe({
          next: (data: any) => {
            this.filme = data;
          },
          error: (error) => {
            alert('Ocorreu um Erro ao Carregar Informações do Filme');
          },
        });
      }
    });
  }
  setCategoria(categoria: string) {
    this.filme.categoria = categoria;
  }
  setClassificacao(classificacao: string) {
    this.filme.classificacaoIndicativa = classificacao;
  }

  selecionarImagem() {
    this.inputImage.nativeElement.click();
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      /*
      if (file.size > this.maxFileSize) {
        alert('File size exceeds the maximum limit of 1MB.');
        return;
      }
*/
      const reader = new FileReader();
      reader.onload = () => {
        this.filme.imagem = reader.result?.toString() || '';
      };
      reader.readAsDataURL(file);
    }
  }

  gravarFilme() {
    this.isLoading = true;
    if (this.filme._id == '0') {
      this.serviceAPI.insertFilme(this.filme).subscribe({
        next: (data: any) => {
          console.log(data);
          this.filme._id = data['id'];
          this.filme.codigo = data['codigo'];
          alert('Filme Incluido com sucesso');
        },
        error: (error: any) => {
          alert('Ocorreu um erro ao atualizar o filme');
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    } else {
      this.serviceAPI.updateFilme(this.filme).subscribe({
        next: (data: any) => {
          alert('Filme atualizado com sucesso');
        },
        error: (error: any) => {
          alert('Ocorreu um erro ao atualizar o filme');
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }
}
