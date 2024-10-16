import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { Observable } from 'rxjs';
import { Project } from '../../infrastructure/types/project';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [AsyncPipe],
  template: `

    @if (project$ | async ; as project) {  <!-- stil can use ann alias with the async pipe -->
      <section>
      <img [src]="project.image" width="150px"/>
      <p> {{project.name}}</p>
    </section>
    }
  `,
  styles: ``
})
export class ProjectCardComponent implements OnChanges {
  private readonly projectService = inject(ProjectsService);

  @Input({required: true}) projectId!: number;
  project$!: Observable<Project>;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['projectId']){
      this.project$ = this.projectService.getProject(this.projectId)
    }
  }

}
