import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-weather-final',
  templateUrl: './weather-final.component.html',
  styleUrls: ['./weather-final.component.css']
})
export class WeatherFinalComponent implements AfterViewInit {
  ngAfterViewInit() {
    const script = document.createElement('script');
    script.src = 'https://static.elfsight.com/platform/platform.js';
    script.async = true;
    document.body.appendChild(script);
  }
}
