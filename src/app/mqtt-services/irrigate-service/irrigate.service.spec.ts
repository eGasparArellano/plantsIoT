import { TestBed } from '@angular/core/testing';

import { IrrigateService } from './irrigate.service';

describe('IrrigateService', () => {
  let service: IrrigateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IrrigateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
