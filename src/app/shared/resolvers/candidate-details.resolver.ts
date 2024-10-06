import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Candidate } from '../../infrastructure/types/candidate';
import { CandidateService } from '../../services/candidate.service';

export const candidateDetailsResolver: ResolveFn<Candidate> = (
  route: ActivatedRouteSnapshot
) => {
  const candidateService = inject(CandidateService);
  const id = +(route.paramMap.get('id') ?? 0);
  return candidateService.getCandidate(id);
};
