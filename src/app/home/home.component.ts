import { Component } from '@angular/core';
import { Task } from '../shared/models/task.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  taskInput: string = '';

  //TODO: convert DATE to localtime
  subtasks: Task[] = [
    {id:1, done: false, text: 'SUBTASK 01', createdAt: new Date()},
    {id:2, done: true, text: 'SUBTASK 02', createdAt: new Date()}
  ]

  tasks: Task[] = [
    {id:1, done: false, text: 'Teste 01', createdAt: new Date()},
    {id:2, done: true, text: 'Teste 02', createdAt: new Date(), subtasks: this.subtasks},
    {id:3, done: false, text: 'Teste 03', createdAt: new Date()}
  ]

  checkTask(task: Task) {
    task.done = !task.done;
  }
  
  addTask(text: string) {
    if(text)
      this.tasks.push({id: this.tasks.length + 1, text, done: false, createdAt: new Date()})

    this.taskInput = '';
  }
}
