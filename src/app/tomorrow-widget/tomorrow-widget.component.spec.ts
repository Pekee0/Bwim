import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TomorrowWidgetComponent } from './tomorrow-widget.component';

describe('TomorrowWidgetComponent', () => {
  let component: TomorrowWidgetComponent;
  let fixture: ComponentFixture<TomorrowWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TomorrowWidgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TomorrowWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
