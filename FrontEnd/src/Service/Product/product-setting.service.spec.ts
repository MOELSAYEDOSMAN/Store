import { TestBed } from '@angular/core/testing';

import { ProductSettingService } from './product-setting.service';

describe('ProductSettingService', () => {
  let service: ProductSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
