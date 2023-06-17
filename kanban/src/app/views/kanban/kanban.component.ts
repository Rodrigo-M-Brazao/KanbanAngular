import { Component } from '@angular/core';
import { Tarefa } from 'src/app/model/tarefa';
import { TarefaService } from 'src/app/service/tarefa.service';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent {
  tarefa = new Tarefa();
  tarefasFazendo: Tarefa[] = [];
  tarefasFazer: Tarefa[] = [];
  tarefasFeito: Tarefa[] = [];
  description = '';
  tipoTarefa = '';
  tipos = ['fazer', 'fazendo', 'feito'];


  constructor( private service : TarefaService) {

  }
  ngOnInit(): void {
    this.listar();
  }

  listar(){
    this.service.listar('fazer').subscribe(parafazer => {
      this.tarefasFazer =  parafazer;
    });
    this.service.listar('fazendo').subscribe(tarefa => {
      this.tarefasFazendo =  tarefa;
    });
    this.service.listar('feito').subscribe(feito => {
      this.tarefasFeito =  feito;
    });
  }
  moveFront(id: number, title: string, description: string,tipo: string){

    this.inserir(title, description, tipo);
    const tipoDelete = this.tipos.indexOf(tipo) === 1 ? 'fazer' : this.tipos.indexOf(tipo) === 2 ? 'fazendo': 'feito';
    this.deletar(id, tipoDelete);
  }
  moveBack(id: number, title: string, description: string,tipo: string){

    this.inserir(title, description, tipo);
    const tipoDelete = this.tipos.indexOf(tipo) === 0 ? 'fazendo' : this.tipos.indexOf(tipo) === 1 ? 'feito': 'fazer';
    this.deletar(id, tipoDelete);
  }
  inserirTarefa(tipo:string){

    this.tarefa.description = this.description;
    this.service.inserir(this.tarefa, tipo).subscribe(tarefa => {
      this.listar();
    });
  }
  inserir(title: string, description: string, tipo:string){
    this.tarefa.title = title;
    this.tarefa.description = description;

    this.service.inserir(this.tarefa, tipo).subscribe(tarefa => {
      this.listar();
    });
  }
  deletar(id: Number, tipo: string){
    this.service.excluir(id, tipo).subscribe(() =>{
      this.listar();
    })
  }

}
