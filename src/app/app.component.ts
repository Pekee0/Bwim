import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component'
import { ScrollRevealComponent } from "./scroll-reveal/scroll-reveal.component";
import { WeatherWidgetFComponent } from "./shared/weather-widget-f/weather-widget-f.component";
import { RegisterFormComponent } from './Components/register-form/register-form.component';
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { AboutComponent } from './pages/about/about.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, RegisterFormComponent, LoginPageComponent,
    ScrollRevealComponent, WeatherWidgetFComponent, AboutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bwim';
}
