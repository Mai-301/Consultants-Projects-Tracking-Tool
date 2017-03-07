import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Project } from '../project';
import { ProjectService } from '../project.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-sub-activities',
  templateUrl: './sub-activities.component.html',
  styleUrls: ['./sub-activities.component.css']
})
export class SubActivitiesComponent implements OnInit {
  tasks: Task[];
  projects: Project[];
  employees: Employee[];
  task: FormGroup;
  header: string;
  @ViewChild('childModal') public childModal: ModalDirective;
  constructor(private taskService: TaskService, private fb: FormBuilder, private employeeService: EmployeeService, private projectService: ProjectService) {
    this.employees = this.employeeService.getEmployees();
    this.projects = this.projectService.getProjects();
    this.tasks = this.taskService.getTasks();
    this.createTaskForm();
  }
  createTaskForm(task?: Task): void {
    if (task) {
      this.task = this.fb.group({
        id: [task.id],
        name: [task.name, [Validators.required, Validators.minLength(5)]],
        description: [task.description, Validators.minLength(10)],
        dueDate: [task.dueDate, Validators.required],
        estimate: [task.estimate, Validators.required],
        spent: task.spent,
        remaining: task.remaining,
        assignedEmployee: task.assignedEmployee,
        assignedProject: task.assignedProject
      });
      this.header = 'Edit task';
    }
    else {
      this.task = this.fb.group({
        id: [''],
        name: ['', [Validators.required, Validators.minLength(5)]],
        description: ['', Validators.minLength(10)],
        dueDate: ['', Validators.required],
        estimate: ['', Validators.required],
        spent: '',
        remaining: '',
        assignedEmployee: '',
        assignedProject: ''
      });
      this.header = 'Add task';
    }
  }
  ngOnInit() {

  }
  onChange() {

  }
  onChangeEmp(){
    
  }
  openTaskModal(task?: Task): void {
    this.createTaskForm(task);
    this.childModal.show();
  }

  hideChildModal(): void {
    this.childModal.hide();
  }

  onSubmit({ value, valid }: { value: Task, valid: boolean }) {
    if (valid) {
      let taskIndex = _.findIndex(this.tasks, function (task) {
        return task.id === value.id
      });
      // if (projectIndex === -1) {
      //   this.projectService.addProject(value);
      // }
      // else this.projects.splice(projectIndex, 1, value);
      taskIndex === -1 ? this.taskService.addTask(value) : this.tasks.splice(taskIndex, 1, value);
      this.childModal.hide();
      this.reset();
    }
  }
  reset(): void {
    this.createTaskForm();
  }
  editProject(task: Task): void {
    this.createTaskForm(task);
    this.childModal.show();

  }
  deleteTask(task: Task): void {
    this.taskService.deleteTask(task);
  }

}
