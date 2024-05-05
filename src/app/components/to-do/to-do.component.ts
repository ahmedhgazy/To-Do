import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskService } from 'src/app/services/to-do.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss'],
})
export class ToDoComponent implements OnInit, OnDestroy {
  tasks: string[] = [];
  inProgressTasks: string[] = [];
  sub: Subscription[] = [];
  editedItem: number;
  editMode: boolean = false;
  tasksService: TaskService = inject(TaskService);
  @ViewChild('form', { static: false }) form: NgForm;
  //  **drag and drop functionality**************
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  //  **drag and drop functionality**************

  ngOnInit(): void {
    this.tasks = this.tasksService.getTasks();
    this.sub.push(
      this.tasksService.taskSubject.subscribe((tasks: string[]) => {
        this.tasks = tasks;
      })
    );
    this.sub.push(
      this.tasksService.indexSubject.subscribe((index) => {
        this.editedItem = index;
        this.editMode = true;
      })
    );
    this.inProgressTasks = this.tasksService.getInprogress();
    this.sub.push(
      this.tasksService.inProgressSubject.subscribe((inpTasks) => {
        this.inProgressTasks = inpTasks;
      })
    );
  }

  onSubmit() {
    if (this.editMode) {
      this.tasksService.editTask(this.form.value['task'], this.editedItem);
    } else {
      this.tasksService.handleTasks(this.form.value['task']);
    }
    this.editMode = false;
    this.editedItem = null;
    this.form.reset();
  }

  removeItem(index: number) {
    this.tasksService.deleteTask(index);
  }

  editTask(index: number) {
    this.tasksService.indexSubject.next(index);
    this.form.setValue({
      task: this.tasks[index],
    });
  }
  ngOnDestroy(): void {
    this.sub.forEach((sub) => sub.unsubscribe());
  }
}
