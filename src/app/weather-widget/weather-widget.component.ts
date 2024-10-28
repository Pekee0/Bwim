import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';  // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.css'],
  standalone: true
})
export class WeatherWidgetComponent implements OnInit {
  location: string = '';
  region: string = '';
  country: string = '';
  tempC: number = 0;
  conditionText: string = '';
  icon: string = '';
  humidity: number = 0;
  feelsLikeC: number = 0;
  windChillC: number = 0;
  dewPointC: number = 0;
  visibilityKm: number = 0;
  gustKph: number = 0;
  localTime: string = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeatherData();
  }

  getWeatherData() {
    const location = 'Yapeyu'; // Puedes cambiar esto a cualquier ubicación que desees
    this.weatherService.getWeatherByLocation(location).subscribe(
      (response) => {
        const {
          location: { name, region, country, localtime },
          current: {
            temp_c,
            condition: { text, icon },
            humidity,
            feelslike_c,
            windchill_c,
            dewpoint_c,
            vis_km,
            gust_kph,
          },
        } = response;

        // Asignar los datos a las propiedades del componente
        this.location = name;
        this.region = region;
        this.country = country;
        this.tempC = temp_c;
        this.conditionText = text;
        this.icon = icon;
        this.humidity = humidity;
        this.feelsLikeC = feelslike_c;
        this.windChillC = windchill_c;
        this.dewPointC = dewpoint_c;
        this.visibilityKm = vis_km;
        this.gustKph = gust_kph;
        this.localTime = localtime;
      },
      (error) => {
        console.error('Error al obtener los datos del clima:', error);
      }
    );
  }
}