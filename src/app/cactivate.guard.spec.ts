import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { cactivateGuard } from './cactivate.guard';

describe('cactivateGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => cactivateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
