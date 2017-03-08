import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';
import { ProjectComponent } from './project/project.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { SubActivitiesComponent } from './sub-activities/sub-activities.component';
import { NavLinkComponent } from './nav-link/nav-link.component';
import { RouterModule, Routes } from '@angular/router';
import { ProjectService } from './project.service';
import { StatusService } from './status.service';
import { ModalModule } from 'ng2-bootstrap';
import { DropdownModule } from 'ng2-bootstrap';
import { LocalStorageService } from 'angular2-localstorage';
import { TaskService } from './task.service';
import { EmployeeService } from './employee.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartModule } from 'angular2-highcharts';
import { ReportComponent } from './report/report.component';

const appRoutes: Routes = [{ path: 'projects', component: ProjectComponent },
{ path: 'subActivities', component: SubActivitiesComponent },
{ path: 'reports/:id', component: ReportComponent },
{ path: '', redirectTo: '/', pathMatch: 'full' }];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchComponent,
    ProjectComponent,
    SideBarComponent,
    SubActivitiesComponent,
    NavLinkComponent,
    DashboardComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    HttpModule, RouterModule.forRoot(appRoutes), ModalModule.forRoot(), DropdownModule.forRoot(),FormsModule,ChartModule.forRoot(require('highcharts'))
  ],
  providers: [ProjectService, StatusService, TaskService, EmployeeService, LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
