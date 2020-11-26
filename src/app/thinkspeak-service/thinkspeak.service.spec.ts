import { TestBed } from '@angular/core/testing';

import { ThinkspeakService } from './thinkspeak.service';

describe('ThinkspeakService', () => {
  let service: ThinkspeakService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThinkspeakService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
