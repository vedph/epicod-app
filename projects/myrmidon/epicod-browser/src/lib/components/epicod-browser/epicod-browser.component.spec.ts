import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicodBrowserComponent } from './epicod-browser.component';

describe('EpicodBrowserComponent', () => {
  let component: EpicodBrowserComponent;
  let fixture: ComponentFixture<EpicodBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpicodBrowserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpicodBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
