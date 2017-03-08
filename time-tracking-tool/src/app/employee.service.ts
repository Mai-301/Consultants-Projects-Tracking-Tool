import { Injectable,Injector } from '@angular/core';
import { LocalStorage, SessionStorage } from 'angular2-localstorage/WebStorage';
//import { TaskService } from './task.service';
import { Employee } from './employee';

@Injectable()
export class EmployeeService {
  private index: number = 0;
  @LocalStorage('employees') employees: Employee[];
  //private taskService: TaskService
  constructor(/*private taskService: TaskService*/ /*injector:Injector*/) {
    //this.taskService = injector.get(TaskService);
    this.employees = [
      { id: 1, firstName: 'Mai', lastName: 'Sadek', email: 'msadek@gmail.com', phoneNumber: 9282838383, role: 'Front End developer', /*assignedTask: this.taskService.getTasks()[0]*/ totalWorkDuration: 0 },
      { id: 2, firstName: 'Mohamed', lastName: 'Beshir', email: 'mbeshir@gmail.com', phoneNumber: 4343434444, role: 'Java developer', /*assignedTask: this.taskService.getTasks()[1]*/ totalWorkDuration: 0 }
    ];
  }
  getEmployees(): Employee[] {
    return this.employees;
  }
}