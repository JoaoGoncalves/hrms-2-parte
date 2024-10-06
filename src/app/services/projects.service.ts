import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Project } from '../infrastructure/types/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private readonly http = inject(HttpClient);

  getProject(id: number){
    return this.http.get<Project>(`/projects/${id}`);
  }
  getProjects(){
    return this.http.get<Project[]>(`/projects`);
  }

}
