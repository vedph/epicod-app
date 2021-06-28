import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicodTextComponent } from './epicod-text.component';

describe('EpicodTextComponent', () => {
  let component: EpicodTextComponent;
  let fixture: ComponentFixture<EpicodTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpicodTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpicodTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
