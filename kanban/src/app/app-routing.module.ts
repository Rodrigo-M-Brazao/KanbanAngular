import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tarefa } from './model/tarefa';
import { KanbanComponent } from './views/kanban/kanban.component';

const routes: Routes = [
  {path: 'tarefa', component: KanbanComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
