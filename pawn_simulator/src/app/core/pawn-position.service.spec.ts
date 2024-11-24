import { TestBed } from '@angular/core/testing';

import { PawnPositionService } from './pawn-position.service';

describe('PawnPositionService', () => {
  let service: PawnPositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PawnPositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
