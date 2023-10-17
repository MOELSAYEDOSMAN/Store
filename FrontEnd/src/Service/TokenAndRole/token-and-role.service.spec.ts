import { TestBed } from '@angular/core/testing';

import { TokenAndRoleService } from './token-and-role.service';

describe('TokenAndRoleService', () => {
  let service: TokenAndRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenAndRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
