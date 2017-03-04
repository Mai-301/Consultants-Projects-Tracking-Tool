import { Injectable } from '@angular/core';
import { Project } from './project';
import { StatusService } from './status.service';
import {LocalStorage, SessionStorage} from 'angular2-localstorage/WebStorage';
@Injectable()
export class ProjectService {
  projects: Project[];
  constructor(private statusService:StatusService) {
    
    this.projects = [{
      id: 1, name: "DNX", description: "whatever", startDate: "10/02/2016",
      endDate: "10/02/2016",
      status: this.statusService.getStatuses()[0],
      budget: 50000,
      estimateHours: 50,
      assignedTeamLeader: "Adry"
    }, {
      id: 1, name: "iMore", description: "whatever", startDate: "10/02/2016",
      endDate: "10/02/2016",
      status: this.statusService.getStatuses()[1],
      budget: 50000,
      estimateHours: 50,
      assignedTeamLeader: "Adry"
    }];
  }
  getProjects() {
    return this.projects;
  }
  addProject(project:Project){
    this.projects.push(project);
  }
}
