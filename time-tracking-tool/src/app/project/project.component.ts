import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from '../project.service';
import { StatusService } from '../status.service';
import { Project } from '../project';
import { Status } from '../status';
import { Overlay } from 'angular2-modal';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projects: Project[];
  statuses: Status[];
  project: FormGroup;
  @ViewChild('childModal') public childModal: ModalDirective;
  constructor(private statusService: StatusService, private projectService: ProjectService, private fb: FormBuilder) {
    this.statuses=this.statusService.getStatuses();
    this.projects = this.projectService.getProjects();
    this.project = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.minLength(10)]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      status: ['', [Validators.required]],
      budget: ['', [Validators.required]],
      estimateHours: ['', [Validators.required]],
      assignedTeamLeader: ['', []],
    });
  }

  ngOnInit() {
  }
  openAddProjectModal(): void {
    this.childModal.show();
  }

  hideChildModal(): void {
    this.childModal.hide();
  }
  addProject(project: Project) {
    console.log(project);
  }
  onSubmit({ value, valid }: { value: Project, valid: boolean }) {
   
   // this.projects.push(value);
    this.projectService.addProject(value);
  }
  onChange(event:Event){

  }
}
