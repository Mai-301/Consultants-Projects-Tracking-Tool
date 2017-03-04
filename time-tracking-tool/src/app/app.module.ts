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

const appRoutes: Routes = [{ path: 'project', component: ProjectComponent },
{ path: 'subActivities', component: SubActivitiesComponent },
{ path: '', redirectTo: '/', pathMatch: 'full' }];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchComponent,
    ProjectComponent,
    SideBarComponent,
    SubActivitiesComponent,
    NavLinkComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,ReactiveFormsModule,
    HttpModule, RouterModule.forRoot(appRoutes), ModalModule.forRoot(),DropdownModule.forRoot()

  ],
  providers: [ProjectService,StatusService],
  bootstrap: [AppComponent]
})
export class AppModule { }
