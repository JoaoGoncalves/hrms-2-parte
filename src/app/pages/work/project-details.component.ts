import { Component, inject, Input, numberAttribute, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../../services/projects.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Project } from '../../infrastructure/types/project';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ProjectCardComponent } from '../../shared/componentes/project-card.component';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [NgIf, AsyncPipe,ProjectCardComponent, NgFor],
  template: `
    <section>
      <h1>Project Detaisl</h1>
      <article *ngIf="project$ | async as project">
        <p>Project Name: {{project.name}}</p>
        <p>Project Description: {{project.description}}</p>
        <h1>Sub Projects</h1>
        <app-project-card *ngFor="let subProjectId of project.subProjectIds" [projectId]="subProjectId"></app-project-card>
      </article>
    </section>
  `,
  styles: ``
})
export class ProjectDetailsComponent implements OnChanges {

  @Input({transform: numberAttribute}) id!: number;
  private readonly projectService = inject(ProjectsService);
  project$: Observable<Project> | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if( changes['id']){
      this.project$ = this.projectService.getProject(this.id)
    }
  }



}
