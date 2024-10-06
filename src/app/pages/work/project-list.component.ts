import { Component, inject } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { ProjectCardComponent } from "../../shared/componentes/project-card.component";
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [ProjectCardComponent, NgFor, AsyncPipe],
  template: `
    <article>
      <app-project-card *ngFor="let project of projects$ | async" [projectId]="project.id"></app-project-card>
    </article>
  `,
  styles: ``
})
export class ProjectListComponent {
  private readonly projectService = inject(ProjectsService);
  projects$ = this.projectService.getProjects();
}
