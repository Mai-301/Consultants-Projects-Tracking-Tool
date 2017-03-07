import { Injectable } from '@angular/core';
import { Task } from './task';
import { LocalStorage, SessionStorage } from 'angular2-localstorage/WebStorage';
import { ProjectService } from './project.service';
import { EmployeeService } from './employee.service';
@Injectable()
export class TaskService {
  private index: number = 0;
  @LocalStorage('tasks') tasks: Task[];
  constructor(private projectService: ProjectService, private employeeService: EmployeeService) {
    this.tasks = [
      { id: 1, name: 'Task1', description: 'task1 description', dueDate: '02/05/2017', estimate: 12, spent: 0, remaining: 12, assignedProject: this.projectService.getProjects()[0], assignedEmployee: this.employeeService.getEmployees()[0] },
      { id: 2, name: 'Task2', description: 'task2 description', dueDate: '02/16/2017', estimate: 5, spent: 0, remaining: 5, assignedProject: this.projectService.getProjects()[1], assignedEmployee: this.employeeService.getEmployees()[1] }];
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
}






