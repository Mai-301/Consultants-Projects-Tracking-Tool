import { Injectable } from '@angular/core';
import { Task } from './task';
import { Project } from './project';
import { ProjectService } from './project.service';
import { LocalStorage, SessionStorage } from 'angular2-localstorage/WebStorage';
@Injectable()
export class TaskService {
  private index: number = 0;
  @LocalStorage('updatedTasks') tasks: Task[];
  constructor() {
    this.tasks = [];
  }
  getTasks(): Task[] {
    return this.tasks;
  }
  addTask(task: Task): void {
    task.id = this.index++;
    this.tasks.push(task);
  }
  deleteTask(task: Task): void {
    this.tasks.splice(this.tasks.indexOf(task), 1);
  }
  getById(id: number): Task {
    for (const task of this.tasks) {
      if (task.id == id) {
        return task;
      }
    }
    return null;
  }
  trackTask(id: number, spentHours: number): number {
    let task = this.getById(id);
    return task.remaining = task.estimate - spentHours;
  }
  getProjectTasks(projectId: number): Task[] {
    let tasks = [];
    for (const task of this.getTasks()) {
      if (task.assignedProjectID == projectId)
        tasks.push(task);
    }
    return tasks;
  }
}






