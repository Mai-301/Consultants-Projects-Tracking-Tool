import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { TaskService } from '../task.service';
import { Project } from '../project';
import { Task } from '../task';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  projectTasks: Task[];
  selectedProject: Project;
  options: Object;
  constructor(private route: ActivatedRoute, private projectService: ProjectService, private taskService: TaskService) {
  }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.selectedProject = this.projectService.getById(p['id']);
      this.projectTasks = this.taskService.getProjectTasks(p['id']);
      this.showReport();
    });
  }

  showReport() {
    let yAxix = [];
    let xAxis = [];
    for (const task of this.projectTasks) {
      yAxix.push(task.remaining);
      xAxis.push(task.name);
    }
    this.options = {
      chart: { type: 'column' },
      title: { text: 'Project ' + this.selectedProject.name + ' chart' },
      yAxis: {
        min: 0,
        title: {
          text: 'Total hours'
        }
      },
      series: [{
        data: yAxix
      }],
      xAxis: {
        categories: xAxis
      }
    };
  }
}
