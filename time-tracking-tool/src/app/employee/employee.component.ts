import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { Project } from '../project';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  projects: Project[];
  tasks: Task[];
  empData: FormGroup;
  constructor(private projectService: ProjectService, private taskService: TaskService, private fb: FormBuilder) {
    this.projects = this.projectService.getProjects();
    this.createEmployeeForm();
  }
  createEmployeeForm() {
    this.empData = this.fb.group({
      project: ['', Validators.required],
      task: ['', Validators.required],
      actualHours: ['', Validators.required]
    });
  }
  ngOnInit() {
  }
  onSubmit({ value, valid }: { value: any, valid: boolean }) {
    if (valid) {
      this.taskService.trackTask(value.task, value.actualHours);
      this.reset();
    }
  }
  reset(): void {
    this.createEmployeeForm();
  }
  onProjectSelect(projectId: number) {
    this.tasks = this.taskService.getProjectTasks(projectId);
  }
}
