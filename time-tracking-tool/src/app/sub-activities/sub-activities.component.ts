import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { Project } from '../project';
import { ProjectService } from '../project.service';
import * as _ from 'lodash';
import { SelectModule } from 'ng2-select';
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
        name: [task.name, [Validators.required, Validators.minLength(5)]],
        description: [task.description, Validators.minLength(10)],
        dueDate: [task.dueDate, Validators.required],
        estimate: [task.estimate, Validators.required],
        assignedProjectID: task.assignedProjectID
      });
      this.header = 'Edit task';
    }
    else {
      this.task = this.fb.group({
        id: [''],
        name: ['', [Validators.required, Validators.minLength(5)]],
        description: ['', Validators.minLength(10)],
        dueDate: ['', Validators.required],
        estimate: ['', Validators.required],
        assignedProjectID: ''
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
  onChangeProjects(project: number) {
    this.task.controls['assignedProjectID'].patchValue(project);
  }
  // checkEstimateHoursValidity(taskIndex: number, projectIndex: number, estimate: number): boolean {
  //   let projectTasks = this.taskService.getProjectTasks(projectIndex);
  //   let accumulatedTaskHours: number = 0;
  //   for (const task of projectTasks) {
  //      if (task.id === taskIndex)
  //        continue;
  //     accumulatedTaskHours += task.estimate;
  //   }
  //   return ((accumulatedTaskHours + estimate) <= this.projectService.getById(projectIndex).estimateHours) ? true : false;
  // }
  onSubmit({ value, valid }: { value: Task, valid: boolean }) {
    if (valid) {
      let taskIndex = _.findIndex(this.tasks, function (task) {
        return task.id === value.id
      });
      // let projectTasks = this.taskService.getProjectTasks(value.assignedProjectID);
      // let taskHours = 0;
      // for (const task of projectTasks) {
      //   taskHours += task.estimate;
      // }
      // if (!this.checkEstimateHoursValidity(taskIndex, value.assignedProjectID, value.estimate))
      //   return;
    // else {
        if (taskIndex === -1) {

          // if (taskHours + value.estimate > this.projectService.getById(value.assignedProjectID).estimateHours)
          //   return;
          this.taskService.addTask(value)

        } else {
          // if (taskHours > this.projectService.getById(value.assignedProjectID).estimateHours)
          //   return;
          // value.remaining = this.taskService.trackTask(taskIndex, value.spent);
          this.tasks.splice(taskIndex, 1, value);
        }
    //  }

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
