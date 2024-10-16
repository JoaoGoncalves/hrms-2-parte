import { AsyncPipe, NgFor } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CandidateService } from '../../services/candidate.service';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { createSearch } from '../../shared/functions/create-search';

@Component({
  selector: 'app-candidates-list',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, RouterLink, AsyncPipe],
  template: `
    <h2>Candidates list</h2>
    <table>
      <caption>Search: <input [formControl]="searchControl"/></caption>
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Email</th>
          <th>Position</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let candidate of candidates$ | async">
          <td>
            <a [routerLink]="[candidate.id]">{{ candidate.firstName }} {{ candidate.lastName }}</a>
          </td>
          <td>{{ candidate.email }}</td>
          <td>{{ candidate.position }}</td>
        </tr>
      </tbody>
    </table>
  `,
  styles: ``
})
export class CandidatesListComponent {

  private readonly candidateService = inject(CandidateService);
  candidates$ = this.candidateService.getCandidates();
  searchControl = new FormControl('');

  search$ = createSearch(this.searchControl)

  ngOnInit(): void {
    this.search$.subscribe(value => {
      if(value){
        this.candidates$ = this.candidateService.getCandidatesByName(value)
      } else {
        this.candidates$ = this.candidateService.getCandidates();
      }
    })
  }

}
