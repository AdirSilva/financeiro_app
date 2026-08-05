import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Categoria, TransacaoRequest, TransacaoResponse } from './models/financeiro.model';
import { CategoriaService } from './services/categoria.service';
import { TransacaoService } from './services/transacao.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  categorias: Categoria[] = [];
  transacoes: TransacaoResponse[] = [];

  novaCategoria: Categoria = { nome: '', tipo: 'RECEITA' };

  novaTransacao: TransacaoRequest = {
    descricao: '',
    valor: 0,
    data: new Date().toISOString().substring(0, 10),
    categoriaId: 0
  };

  transacaoEmEdicaoId: number | null = null;

  constructor(
    private categoriaService: CategoriaService,
    private transacaoService: TransacaoService
  ) {}

  ngOnInit(): void {
    this.carregarCategorias();
    this.carregarTransacoes();
  }

  carregarCategorias(): void {
    this.categoriaService.listarTodas().subscribe({
      next: (data) => this.categorias = data,
      error: (err) => console.error('Erro ao buscar categorias:', err)
    });
  }

  carregarTransacoes(): void {
    this.transacaoService.listarTodas().subscribe({
      next: (data) => this.transacoes = data,
      error: (err) => console.error('Erro ao buscar transações:', err)
    });
  }

  salvarCategoria(): void {
    if (!this.novaCategoria.nome || this.novaCategoria.nome.trim() === '') {
      alert('Informe o nome da categoria!');
      return;
    }

    this.categoriaService.cadastrar(this.novaCategoria).subscribe({
      next: () => {
        this.novaCategoria = { nome: '', tipo: 'RECEITA' };
        this.carregarCategorias();
      },
      error: (err) => console.error('Erro ao salvar categoria:', err)
    });
  }

  salvarTransacao(): void {
    if (this.novaTransacao.categoriaId === 0) {
      alert('Selecione uma categoria!');
      return;
    }

    if (this.transacaoEmEdicaoId) {
      this.transacaoService.atualizar(this.transacaoEmEdicaoId, this.novaTransacao).subscribe({
        next: () => {
          this.resetarFormularioTransacao();
          this.carregarTransacoes();
        },
        error: (err) => console.error('Erro ao atualizar transação:', err)
      });
    } else {
      this.transacaoService.cadastrar(this.novaTransacao).subscribe({
        next: () => {
          this.resetarFormularioTransacao();
          this.carregarTransacoes();
        },
        error: (err) => console.error('Erro ao cadastrar transação:', err)
      });
    }
  }

  prepararEdicao(t: TransacaoResponse): void {
    this.transacaoEmEdicaoId = t.id;
    this.novaTransacao = {
      descricao: t.descricao,
      valor: t.valor,
      data: t.data,
      categoriaId: t.categoria.id!
    };
  }

  deletarTransacao(id: number): void {
    if (confirm('Deseja realmente excluir esta transação?')) {
      this.transacaoService.deletar(id).subscribe({
        next: () => this.carregarTransacoes(),
        error: (err) => console.error('Erro ao excluir transação:', err)
      });
    }
  }

  resetarFormularioTransacao(): void {
    this.transacaoEmEdicaoId = null;
    this.novaTransacao = {
      descricao: '',
      valor: 0,
      data: new Date().toISOString().substring(0, 10),
      categoriaId: 0
    };
  }
}