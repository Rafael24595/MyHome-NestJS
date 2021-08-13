import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionListImageComponent } from './collection-list-image.component';

describe('CollectionListImageComponent', () => {
  let component: CollectionListImageComponent;
  let fixture: ComponentFixture<CollectionListImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionListImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionListImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
