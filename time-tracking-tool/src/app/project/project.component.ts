import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from '../project.service';
import { StatusService } from '../status.service';
import { Project } from '../project';
import { Status } from '../status';
import { Overlay } from 'angular2-modal';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projects: Project[];
  statuses: Status[];
  project: FormGroup;
  header:string;
  @ViewChild('childModal') public childModal: ModalDirective;
  constructor(private statusService: StatusService, private projectService: ProjectService, private fb: FormBuilder) {
    this.statuses = this.statusService.getStatuses();
    this.projects = this.projectService.getProjects();
    this.createProjectForm();
  }
  createProjectForm(project?: Project): void {
    if (project) {
      this.project = this.fb.group({
        id: [project.id],
        name: [project.name, [Validators.required, Validators.minLength(5)]],
        description: [project.description, [Validators.minLength(10)]],
        startDate: [project.startDate, [Validators.required]],
        endDate: [project.endDate, [Validators.required]],
        status: [project.status, [Validators.required]],
        budget: [project.budget, [Validators.required]],
        estimateHours: [project.estimateHours, [Validators.required]],
        assignedTeamLeader: [project.assignedTeamLeader, []],
      });
      this.header='Edit Project';
    }
    else {
      this.project = this.fb.group({
        id: [''],
        name: ['', [Validators.required, Validators.minLength(5)]],
        description: ['', [Validators.minLength(10)]],
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
        status: ['', [Validators.required]],
        budget: ['', [Validators.required]],
        estimateHours: ['', [Validators.required]],
        assignedTeamLeader: ['', []],
      });
      this.header='Add Project';
    }
  }
  ngOnInit() {

  }
  onChange() {

  }
  openProjectModal(project?: Project): void {
    this.createProjectForm(project);
    this.childModal.show();
  }

  hideChildModal(): void {
    this.childModal.hide();
  }

  onSubmit({ value, valid }: { value: Project, valid: boolean }) {
    if (valid) {
      //let projectIndex = _.indexOf(this.projects, _.find(this.projects, value));
      let projectIndex = _.findIndex(this.projects, function (project) {
        return project.id === value.id
      });
      if (projectIndex === -1) {
        this.projectService.addProject(value);
      }
      else this.projects.splice(projectIndex, 1, value);

      this.childModal.hide();
      this.reset();
    }
  }
  reset(): void {
    this.createProjectForm();
  }
  editProject(project: Project): void {
    this.createProjectForm(project);
    this.childModal.show();

  }
  deleteProject(project: Project): void {
    this.projectService.deleteProject(project);
  }
}
