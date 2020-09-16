import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesCategorySidebarComponent } from './movies-category-sidebar.component';

describe('MoviesCategorySidebarComponent', () => {
  let component: MoviesCategorySidebarComponent;
  let fixture: ComponentFixture<MoviesCategorySidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviesCategorySidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesCategorySidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
