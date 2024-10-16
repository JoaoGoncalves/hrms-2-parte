import { Component, inject, input, Input, numberAttribute, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../../services/projects.service';
import { Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { Project } from '../../infrastructure/types/project';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ProjectCardComponent } from '../../shared/componentes/project-card.component';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [NgIf, AsyncPipe,ProjectCardComponent, NgFor],
  template: `
    <section>
      <h1>Project Detaisl</h1>
      @if (project(); as project) {
        <article>
          <p>Project Name: {{project.name}}</p>
          <p>Project Description: {{project.description}}</p>
          <h1>Sub Projects</h1>
          <app-project-card *ngFor="let subProjectId of project.subProjectIds" [projectId]="subProjectId"></app-project-card>
        </article>
      }
    </section>
  `,
  styles: ``
})
export class ProjectDetailsComponent {

  private readonly projectService = inject(ProjectsService);
  //!criar um input signal par ao ID em vez do decorator
  //@Input({transform: numberAttribute}) id!: number;
  //id = input(null, {transform: numberAttribute});
  id = input.required({transform: numberAttribute}); //! assegurar que id nao é "null"

  //! converter em Signal o Observable responsavel pela chamada HTTP
  //project$: Observable<Project> | null = null;
  project = toSignal(
    toObservable(this.id).pipe( //! trabsformar o id que é um siganl num observable para o HTTP
      //switchMap(id => this.projectService.getProject(id!))
      switchMap(id => this.projectService.getProject(id)) //! com o required garantimos que o id nao é null
    )
  )

  //! nao preciso do  "onChanges"
  /* ngOnChanges(changes: SimpleChanges): void {
    if( changes['id']){
      this.project$ = this.projectService.getProject(this.id)
    }
  } */

}

//! NOTA: signal inputs disallow this, and they do not have “set” or “update” methods, so their only source of new data is the parent component.
