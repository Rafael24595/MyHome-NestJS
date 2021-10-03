import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionListVideoComponent } from './collection-list-video.component';

describe('CollectionListVideoComponent', () => {
  let component: CollectionListVideoComponent;
  let fixture: ComponentFixture<CollectionListVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionListVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionListVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
