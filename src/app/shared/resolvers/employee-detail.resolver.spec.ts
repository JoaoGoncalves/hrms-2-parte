import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { employeeDetailResolver } from './employee-detail.resolver';

describe('employeeDetailResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => employeeDetailResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
