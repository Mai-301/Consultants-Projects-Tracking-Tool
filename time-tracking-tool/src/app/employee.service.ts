import { Injectable, Injector } from '@angular/core';
import { LocalStorage, SessionStorage } from 'angular2-localstorage/WebStorage';
import { Employee } from './employee';

@Injectable()
export class EmployeeService {
  private index: number = 0;
  @LocalStorage('employees') employees: Employee[];
  constructor() {
    this.employees = [
      { id: 1, firstName: 'Mai', lastName: 'Sadek', email: 'msadek@gmail.com', phoneNumber: 9282838383, role: 'Front End developer', tasks: [], totalWorkDuration: 0 },
      { id: 2, firstName: 'Mohamed', lastName: 'Beshir', email: 'mbeshir@gmail.com', phoneNumber: 4343434444, role: 'Java developer', tasks: [], totalWorkDuration: 0 }
    ];
  }
  getEmployees(): Employee[] {
    return this.employees;
  }
  getById(id: number): Employee {
    for (const employee of this.employees) {
      if (employee.id == id) {
        return employee;
      }
    }
    return null;
  }
}