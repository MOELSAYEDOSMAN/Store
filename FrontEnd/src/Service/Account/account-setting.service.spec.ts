import { TestBed } from '@angular/core/testing';

import { AccountSettingService } from './account-setting.service';

describe('AccountSettingService', () => {
  let service: AccountSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
