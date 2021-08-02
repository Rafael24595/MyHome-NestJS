import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioBarModalComponent } from './audio-bar-modal.component';

describe('AudioBarModalComponent', () => {
  let component: AudioBarModalComponent;
  let fixture: ComponentFixture<AudioBarModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudioBarModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioBarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
