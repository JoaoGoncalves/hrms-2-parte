import { Routes } from '@angular/router';

import { CandidateDetailsComponent } from './candidate-details.component';
import { CandidatesListComponent } from './candidates-list.component';
import { candidateDetailsResolver } from '../../shared/resolvers/candidate-details.resolver';




export const routes: Routes = [
    { path: '', redirectTo: 'candidates', pathMatch: 'full' },
    { path: 'candidates', pathMatch: 'full', component: CandidatesListComponent },
    { path: 'candidates/:id', component: CandidateDetailsComponent, resolve: { candidate: candidateDetailsResolver } },
];
