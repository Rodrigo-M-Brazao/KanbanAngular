import { Injectable } from '@angular/core';
import { Tarefa } from '../model/tarefa';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  constructor(private http: HttpClient) { }

  listar(tabela: string) : Observable<Tarefa[]>{
    return this.http.get<Tarefa[]>(`http://localhost:3000/${tabela}`);
  }
  inserir(tarefa: Tarefa, tipo:string): Observable<Tarefa>{

    return this.http.post<Tarefa>(`http://localhost:3000/${tipo}`, tarefa);
  }
  excluir(id:Number, tipo: string): Observable<any>{
    return this.http.delete<Tarefa>(`http://localhost:3000/${tipo}/${id}`);
  }
}
