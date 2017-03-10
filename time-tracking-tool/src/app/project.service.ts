import { Injectable } from '@angular/core';
import { Project } from './project';
import { StatusService } from './status.service';
import { LocalStorage, SessionStorage } from 'angular2-localstorage/WebStorage';

@Injectable()
export class ProjectService {
  private index: number = 0;
  @LocalStorage('updatedProjects') projects: Project[];
  constructor(private statusService: StatusService) {
    this.projects = [];
  }
  getById(id: number): Project {
    for (const project of this.projects) {
      if (project.id == id) {
        return project;
      }
    }
    return null;
  }
  getProjects(): Project[] {
    return this.projects;
  }
  addProject(project: Project): void {
    project.id = this.index++;
    this.projects.push(project);
  }
  deleteProject(project: Project): void {
    let index = this.projects.indexOf(project);   
    this.projects.splice(this.projects.indexOf(project), 1);
  }

}
