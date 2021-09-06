import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioBarLiteComponent } from './audio-bar-lite.component';

describe('AudioBarLiteComponent', () => {
  let component: AudioBarLiteComponent;
  let fixture: ComponentFixture<AudioBarLiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudioBarLiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioBarLiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
