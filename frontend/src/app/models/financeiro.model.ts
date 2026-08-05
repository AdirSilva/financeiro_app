export interface Categoria {
  id?: number;
  nome: string;
  tipo: 'RECEITA' | 'DESPESA';
}

export interface TransacaoRequest {
  descricao: string;
  valor: number;
  data: string;
  categoriaId: number;
}

export interface TransacaoResponse {
  id: number;
  descricao: string;
  valor: number;
  data: string;
  categoria: Categoria;
}