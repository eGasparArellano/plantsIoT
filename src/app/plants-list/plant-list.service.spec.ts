import { TestBed } from '@angular/core/testing';

import { PlantListService } from './plant-list.service';

describe('PlantListService', () => {
  let service: PlantListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
