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
  chartsOptions: Object[] = [];
  noProjectTasksFlag: boolean = false;
  noActualSeriesFlag: boolean = false;
  currentDateTime: String;
  constructor(private route: ActivatedRoute, private projectService: ProjectService, private taskService: TaskService) {
  }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.selectedProject = this.projectService.getById(p['id']);
      this.projectTasks = this.taskService.getProjectTasks(p['id']);
      if (this.projectTasks.length == 0) {
        this.noProjectTasksFlag = true;
        return;
      }
      this.prepareData();
    });
  }

  prepareData() {
    let actualSeries = [];
    let estimateSeries = [];
    let chartSerieses = [];
    for (const task of this.projectTasks) {
      if (task.actual !== undefined) {
        const actualTaskHours: { name: string, y: number } = { name: task.function, y: task.actual };
        actualSeries.push(actualTaskHours);
        this.noActualSeriesFlag = true;
      }
      const estimateTaskHours: { name: string, y: number } = { name: task.function, y: task.estimate };
      estimateSeries.push(estimateTaskHours);
    }
    if (actualSeries.length > 0)
      chartSerieses.push(actualSeries);

    chartSerieses.push(estimateSeries);
    this.drawCharts(chartSerieses);
    this.currentDateTime = new Date().toLocaleString();
  }

  drawCharts(chartSerieses: Array<Array<Object>>) {
    for (let i = 0; i < chartSerieses.length; i++) {
      let chartObj = {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: ''
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false
            },
            showInLegend: true,
            size: 130
          }
        },
        series: [{
          name: 'Tasks',
          colorByPoint: true,
          data: chartSerieses[i]
        }]
      };
      this.chartsOptions.push(chartObj);
    }
  }


}
