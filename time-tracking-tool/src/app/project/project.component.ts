import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from '../project.service';
import { Project } from '../project';
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
  project: FormGroup;
  header: string;
  @ViewChild('childModal') public childModal: ModalDirective;
  constructor(private projectService: ProjectService, private fb: FormBuilder) {
    this.projects = this.projectService.getProjects();
    this.createProjectForm();
  }
  createProjectForm(project?: Project): void {
    if (project) {
      this.project = this.fb.group({
        id: project.id,
        name: [project.name, Validators.required],
        description: project.description,
        startDate: [project.startDate, Validators.required],
        endDate: [project.endDate, Validators.required],
        budget: [project.budget, Validators.required]
      });
      this.header = 'Edit Project';
    }
    else {
      this.project = this.fb.group({
        id: [''],
        name: ['', Validators.required],
        description: '',
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        budget: ['', Validators.required]
      });
      this.header = 'Add Project';
    }
  }
  ngOnInit() {
  
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
      let projectIndex = _.findIndex(this.projects, function (project) {
        return project.id === value.id
      });
      projectIndex === -1 ? this.projectService.addProject(value) : this.projects.splice(projectIndex, 1, value);
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
