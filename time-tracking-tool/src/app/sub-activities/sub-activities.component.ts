import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Task } from '../task';
import { TaskService } from '../task.service';
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
  task: FormGroup;
  header: string;
  functions: String[] = ['Account Manager', 'Team Leader', 'Engineer', 'Tester', 'Account Manager'];
  @ViewChild('childModal') public childModal: ModalDirective;
  constructor(private taskService: TaskService, private fb: FormBuilder, private projectService: ProjectService) {
    this.tasks = this.taskService.getTasks();
    this.projects = this.projectService.getProjects();
    this.createTaskForm();
  }

  createTaskForm(task?: Task): void {
    if (task) {
      this.task = this.fb.group({
        id: [task.id],
        name: [task.name, Validators.required],
        description: task.description,
        dueDate: [task.dueDate, Validators.required],
        estimate: [task.estimate, Validators.required],
        assignedProjectID: [task.assignedProjectID, Validators.required],
        function: [task.function, Validators.required]
      });
      this.header = 'Edit task';
    }
    else {
      this.task = this.fb.group({
        id: [''],
        name: ['', Validators.required],
        description: '',
        dueDate: ['', Validators.required],
        estimate: ['', Validators.required],
        assignedProjectID: ['', Validators.required],
        function: ['', Validators.required]
      });
      this.header = 'Add task';
    }
  }
  ngOnInit() {
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
    this.childModal.show()
  }
  deleteTask(task: Task): void {
    this.taskService.deleteTask(task);
  }

}
