import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransacaoRequest, TransacaoResponse } from '../models/financeiro.model';

@Injectable({
  providedIn: 'root'
})
export class TransacaoService {
  private apiUrl = 'http://localhost:8080/api/transacoes';

  constructor(private http: HttpClient) {}

  listarTodas(): Observable<TransacaoResponse[]> {
    return this.http.get<TransacaoResponse[]>(this.apiUrl);
  }

  cadastrar(transacao: TransacaoRequest): Observable<TransacaoResponse> {
    return this.http.post<TransacaoResponse>(this.apiUrl, transacao);
  }

  atualizar(id: number, transacao: TransacaoRequest): Observable<TransacaoResponse> {
    return this.http.put<TransacaoResponse>(`${this.apiUrl}/${id}`, transacao);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}