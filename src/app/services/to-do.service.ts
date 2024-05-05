import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      this.tasks = JSON.parse(tasks);
    }
    const inPTasks = localStorage.getItem('IPtasks');
    if (tasks) {
      this.inprogressTasks = JSON.parse(inPTasks);
    }
  }
  tasks: string[] = [];
  inprogressTasks: string[] = [];
  taskSubject = new Subject<string[]>();
  getTasks() {
    return this.tasks.slice();
  }

  AddTask(task: string) {
    if (task === '') {
      return;
    }
    this.tasks.push(task);
    this.updateLocalS();
    this.taskSubject.next(this.tasks.slice());
  }

  storeIndexToEMitTOForm = new Subject<number>();

  private updateLocalS() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  removeAllTasks() {
    this.tasks = [];
    this.updateLocalS();
    this.taskSubject.next(this.tasks.slice());
  }

  returnTaskOfIndex(index: number) {
    return this.tasks[index];
  }
  editTasNumberOne() {}
  editTask(newTask: string, index: number) {
    this.tasks[index] = newTask;
    this.updateLocalS();
    this.taskSubject.next(this.tasks.slice());
  }

  handleTasks(newTask: string) {
    if (this.tasks.includes(newTask.trim())) {
      const userInput = prompt(
        'This task is already in the list, do you wanna add ? (y/n)'
      );
      if (userInput === 'y') {
        this.AddTask(newTask);
      } else {
        return;
      }
    } else {
      this.AddTask(newTask);
    }
  }

  indexSubject = new Subject<number>();

  //************************In Progress tasks************************* */
  getInprogress() {
    if (this.inprogressTasks != null || this.inprogressTasks != undefined) {
      return this.inprogressTasks.slice();
    } else {
      return [];
    }
  }
  inProgressSubject = new Subject<string[]>();

  // addTaskToInP(task: string) {
  //   if (task === '') {
  //     return;
  //   }
  //   this.inprogressTasks.push(task);
  //   this.updateLocalSFromIp();
  //   this.inProgressSubject.next(this.tasks.slice());
  // }

  deleteTaskFromIp(index: number) {
    this.tasks.splice(index, 1);
    this.updateLocalS();
    this.inProgressSubject.next(this.inprogressTasks.slice());
  }

  private updateLocalSFromIp() {
    localStorage.setItem('IPtasks', JSON.stringify(this.inprogressTasks));
  }

  removeAllTasksFromIp() {
    this.inprogressTasks = [];
    this.updateLocalS();
    this.inProgressSubject.next(this.inprogressTasks.slice());
  }
  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.updateLocalStorage('tasks');
    this.taskSubject.next(this.tasks.slice());
  }

  addTaskToInP(task: string) {
    this.inprogressTasks.push(task);
    this.updateLocalStorage('IPtasks');
  }

  private updateLocalStorage(key: string) {
    if (key === 'tasks') {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    } else if (key === 'IPtasks') {
      localStorage.setItem('IPtasks', JSON.stringify(this.inprogressTasks));
    }
  }

  returnTaskOfIndexFromIp(index: number) {
    return this.inprogressTasks[index];
  }

  editTaskFromIp(newTask: string, index: number) {
    this.inprogressTasks[index] = newTask;
    this.updateLocalS();
    this.inProgressSubject.next(this.inprogressTasks.slice());
  }

  handleTasksFromIp(newTask: string) {
    if (this.inprogressTasks.includes(newTask.trim())) {
      const userInput = prompt(
        'This task is already in the list, do you wanna add ? (y/n)'
      );
      if (userInput === 'y') {
        this.addTaskToInP(newTask);
      } else {
        return;
      }
    } else {
      this.addTaskToInP(newTask);
    }
  }
}
