import { TestBed } from '@angular/core/testing';

import { CkUserLoginGuard } from './ck-user-login.guard';

describe('CkUserLoginGuard', () => {
  let guard: CkUserLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CkUserLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
