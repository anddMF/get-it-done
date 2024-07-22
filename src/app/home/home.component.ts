import { Component, ElementRef, ViewChild } from '@angular/core';
import { Task } from '../shared/models/task.model';

import * as moment from 'moment';
import 'moment/locale/pt-br';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild('edit') editInput: ElementRef | undefined;

  taskInput: string = '';
  showInputSubtask: boolean = false;
  tasksDoneCounter: number = 0;
  totalTasksCounter: number = 0;
  oldTaskDoneCounter: number = 0;
  oldTotalTasksCounter: number = 0;
  usedHours: number = 0;
  showMessage: boolean = false;
  deletedTasksMessage: string = "TIME'S UP! ALL TASKS WERE DELETED.";

  subtasks: Task[] = [];

  tasks: Task[] = [];

  constructor() {
    if (localStorage.getItem('dataSource') === null) {
      localStorage.setItem('dataSource', JSON.stringify(this.tasks));
    } else {
      var storedArray = JSON.parse(localStorage.getItem('dataSource') || '');
      this.tasks = storedArray;
    }

    if (localStorage.getItem('dateCounter') === null) {
      localStorage.setItem('dateCounter', JSON.stringify(moment().format()));
      this.usedHours = this.getHoursUsed();
      this.generateInitialTasks();
    } else {
      this.usedHours = this.getHoursUsed();
      if (this.usedHours > 24) {
        this.showMessage = true;
        this.tasksCounter();
        this.oldTaskDoneCounter = this.tasksDoneCounter;
        this.oldTotalTasksCounter = this.totalTasksCounter;
        this.generateInitialTasks();
        this.saveTasks();
        localStorage.setItem('dateCounter', JSON.stringify(moment().format()));
        this.usedHours = this.getHoursUsed();
      }
    }

    this.tasksCounter();
  }

  checkTask(task: Task) {
    task.done = !task.done;
    this.saveTasks();
  }

  addTask(text: string) {
    if (text)
      this.tasks.push(this.createTask(text, this.tasks.length > 0 ? this.tasks[this.tasks.length - 1].id + 1 : 1, []));

    this.taskInput = '';
    this.saveTasks();
  }

  addSubtask(task: Task, text: string) {
    if (text) {
      task.subtasks?.push(this.createTask(text, task.subtasks.length > 0 ? task.subtasks[task.subtasks.length - 1].id + 1 : 1, []));
    }
    this.saveTasks();
  }

  removeTask(tasks: Task[], index: number) {
    tasks.splice(index, 1);
    this.saveTasks();
  }

  changeEditableTask(task: Task) {
    task.editable = !task.editable;
    if (task.editable) {
      this.editInput?.nativeElement.focus();
    }
    this.saveTasks();
  }

  updateTaskText(text: string, task: Task) {
    if (text && task) {
      task.text = text;
      task.editable = false;
      this.saveTasks();
    }
  }

  tasksCounter() {
    this.totalTasksCounter = this.tasks.length;
    this.tasksDoneCounter = this.tasks.filter(item => item.done === true).length;
  }

  saveTasks() {
    localStorage.setItem('dataSource', JSON.stringify(this.tasks));
    this.tasksCounter();
  }

  getHoursUsed(): number {
    var dates = JSON.parse(localStorage.getItem('dateCounter') || '')
    let hours = moment().diff(moment(dates), 'hours');
    return hours;
  }

  private createTask(text: string, id: number, subtasks: Task[], done: boolean = false): Task {
    return { id, text, done, createdAt: moment().format(), addSubtask: false, subtasks, editable: false }
  }

  private generateInitialTasks() {
    this.subtasks = [
      this.createTask('Form F234', 1, []),
      this.createTask('Passport copy', 2, [], true)
    ];
  
    this.tasks = [
      this.createTask('Send email to Robert', 1, [], true),
      this.createTask('Finish Mary documentation', 2, this.subtasks),
      this.createTask('Make dinner', 3, [])
    ];
  }
}
