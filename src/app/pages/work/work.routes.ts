import { Routes } from "@angular/router";
import { ProjectListComponent } from "./project-list.component";
import { ProjectDetailsComponent } from "./project-details.component";


export const routes : Routes = [
  {path: 'projects', pathMatch: 'full', component: ProjectListComponent},
  {path: 'projects/:id', component: ProjectDetailsComponent},
]
