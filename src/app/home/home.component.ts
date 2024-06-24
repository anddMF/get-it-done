import { Component } from '@angular/core';
import { Task } from '../shared/models/task.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  taskInput: string = '';
  showInputSubtask: boolean = false;
  hover: boolean = false

  //TODO: convert DATE to localtime
  subtasks: Task[] = [
    this.createTask('SUBTASK 01', 1, []),
    this.createTask('SUBTASK 02', 2, [], true)
  ]

  tasks: Task[] = [
    this.createTask('TESTE 01', 1, [], true),
    this.createTask('TESTE 02', 2, this.subtasks),
    this.createTask('TESTE 03', 3, [])
  ]

  checkTask(task: Task) {
    task.done = !task.done;
  }
  
  addTask(text: string) {
    if(text)
      this.createTask(text, this.tasks.length + 1, [])

    this.taskInput = '';
  }

  addSubtask(task: Task, text: string) {
    if(text) {
      task.subtasks?.push(this.createTask(text, task.subtasks.length + 1, []))
    }
  }

  removeTask(tasks: Task[], index: number){
    tasks.splice(index, 1)
  }

  private createTask(text: string, id: number, subtasks: Task[], done: boolean = false): Task {
    return {id, text, done, createdAt: new Date(), addSubtask: false, subtasks, hover: false}
  }
}
