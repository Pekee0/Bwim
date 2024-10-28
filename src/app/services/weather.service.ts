import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  
  // private apiKey = '22b12c135215fd83420f261f9bf8252e'; // Añade tu clave API aquí
  private apiKey = "1bd46797e1314e5a9d030517242810";

  constructor(private http: HttpClient) {}

  // Método para obtener el clima según la ubicación
  getWeatherByLocation(location: string): Observable<any> {
    const url = "http://api.weatherapi.com/v1/current.json?key=1bd46797e1314e5a9d030517242810&q=Yapeyu&aqi=no";
    return this.http.get(url);
  }
}