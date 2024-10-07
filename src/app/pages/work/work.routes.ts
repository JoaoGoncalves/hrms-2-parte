import { Routes } from "@angular/router";
import { ProjectListComponent } from "./project-list.component";
import { ProjectDetailsComponent } from "./project-details.component";
import { TimeOffManagementComponent } from "./time-off-management.component";


export const routes : Routes = [
  {path: 'projects', pathMatch: 'full', component: ProjectListComponent},
  {path: 'projects/:id', component: ProjectDetailsComponent},
  {path: 'time-off', component: TimeOffManagementComponent },
]
