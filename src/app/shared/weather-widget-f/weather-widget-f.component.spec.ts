import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherWidgetFComponent } from './weather-widget-f.component';

describe('WeatherWidgetFComponent', () => {
  let component: WeatherWidgetFComponent;
  let fixture: ComponentFixture<WeatherWidgetFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherWidgetFComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeatherWidgetFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
