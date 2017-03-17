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
import { RouterModule, Routes } from '@angular/router';
import { ProjectService } from './project.service';
import { ModalModule } from 'ng2-bootstrap';
import { DropdownModule } from 'ng2-bootstrap';
import { LocalStorageService } from 'angular2-localstorage';
import { TaskService } from './task.service';
import { EmployeeService } from './employee.service';
import { ChartModule } from 'angular2-highcharts';
import { ReportComponent } from './report/report.component';
import { AdminComponent } from './admin/admin.component';
import { EmployeeComponent } from './employee/employee.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  {
    path: 'admin', component: AdminComponent,
    children: [
      { path: 'projects', component: ProjectComponent },
      { path: 'subActivities', component: SubActivitiesComponent },
      { path: 'projects/reports/:id', component: ReportComponent }
    ]
  }
  , { path: 'employee', component: EmployeeComponent },
  { path: '', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchComponent,
    ProjectComponent,
    SideBarComponent,
    SubActivitiesComponent,
    ReportComponent,
    AdminComponent,
    EmployeeComponent,
    FooterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    HttpModule, RouterModule.forRoot(appRoutes), ModalModule.forRoot(), DropdownModule.forRoot(), FormsModule, ChartModule.forRoot(require('highcharts'))
  ],
  providers: [ProjectService, TaskService, EmployeeService, LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
