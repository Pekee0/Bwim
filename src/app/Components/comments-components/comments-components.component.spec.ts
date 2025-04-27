import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsComponentsComponent } from './comments-components.component';

describe('CommentsComponentsComponent', () => {
  let component: CommentsComponentsComponent;
  let fixture: ComponentFixture<CommentsComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentsComponentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommentsComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
