import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicodTreeComponent } from './epicod-tree.component';

describe('EpicodTreeComponent', () => {
  let component: EpicodTreeComponent;
  let fixture: ComponentFixture<EpicodTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EpicodTreeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpicodTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
