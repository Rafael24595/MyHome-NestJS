import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomAuxMenuComponent } from './bottom-aux-menu.component';

describe('BottomAuxMenuComponent', () => {
  let component: BottomAuxMenuComponent;
  let fixture: ComponentFixture<BottomAuxMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BottomAuxMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomAuxMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
