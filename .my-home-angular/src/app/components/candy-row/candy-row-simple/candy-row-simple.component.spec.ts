import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandyRowSimpleComponent } from './candy-row-simple.component';

describe('CandyRowSimpleComponent', () => {
  let component: CandyRowSimpleComponent;
  let fixture: ComponentFixture<CandyRowSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandyRowSimpleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandyRowSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
