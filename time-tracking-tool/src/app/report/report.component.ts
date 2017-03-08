import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { TaskService } from '../task.service';
import { Project } from '../project';
import { Task } from '../task';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  //projects: Project[];
  selectedProject: Project;
  options: Object;
  constructor(private route: ActivatedRoute, private projectService: ProjectService, private taskService: TaskService) {
    //this.projects = this.projectService.getProjects();
    //this.selectedProject = this.projects[0];
  }
  // onChange(project: Project) {
  //   this.selectedProject = project;
  // }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.selectedProject = this.projectService.getById(p['id']);
      this.getProjectTasks();
      this.showReport();
    });
  }
  getProjectTasks(): Task[] {
    let tasks = [];
    console.log(this.taskService.getTasks());
    for (const task of this.taskService.getTasks()) {
      if (task.assignedProjectID === this.selectedProject.id)
        tasks.push(task);
    }
    return tasks;
  }
  showReport() {
    let tasks = this.getProjectTasks();
    let yAxix = [];
    let xAxis = [];
    for (const task of tasks) {
      yAxix.push(task.remaining);
      xAxis.push(task.name);
    }
    this.options = {
      chart: { type: 'column' },
      title: { text: 'Project ' + this.selectedProject.name + ' chart' },
      series: [{
        data: yAxix
      }],
      xAxis: {
        categories: xAxis
      }
    };
  }
}
