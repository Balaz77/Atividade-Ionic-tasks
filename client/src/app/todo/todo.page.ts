import { Component, OnInit } from '@angular/core';
//import { TodoPage } from './todo.page';
import {TodoService} from '../todo.service';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {

  tasks: any[]=[];
  newTask: string = '';
  editingTask: any = '';

  constructor(private todoService: TodoService ) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks(){
    this.todoService.getTasks().subscribe(
      (data: any[])=>{
        this.tasks = data;
      }, 
      (error: any)=>{
        console.error('Erro ao carregar as tarefas', error);
      }
      );
  }

  addTask(){
    if(this.newTask.trim().length===0) return;

    const task = {name: this.newTask};

    this.todoService.addTask(task).subscribe(()=>{
      this.getTasks();

      this.newTask = "";
    }, (error: any)=>{
      console.error('Erro ao adicionar tarefa:', error)
    }
    );
  }

  editTask(task: any){
    this.editingTask = {...task};
  }

  cancelEdit(){
    this.editingTask = null;
  }

  updateTask(){
    if(!this.editingTask) return;

    this.todoService.updateTasks(this.editingTask.id, this.editingTask).subscribe(()=>{
      this.getTasks();
      this.editingTask = null;
    }, (error: any)=>{
      console.error('Erro ao atualizar a tarefa', error);
    }
    );
  }

  deleteTask(id:number){
    this.todoService.deletedTask(id).subscribe(()=>{
      this.getTasks();
    }, ()=> {
      
    }
    );
  }

}
