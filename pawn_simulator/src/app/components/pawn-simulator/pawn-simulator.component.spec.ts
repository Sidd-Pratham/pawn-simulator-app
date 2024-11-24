import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PawnSimulatorComponent } from './pawn-simulator.component';

describe('PawnSimulatorComponent', () => {
  let component: PawnSimulatorComponent;
  let fixture: ComponentFixture<PawnSimulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PawnSimulatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PawnSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
