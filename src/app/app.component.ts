import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd  } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component'
import { ScrollRevealComponent } from "./scroll-reveal/scroll-reveal.component";
import { WeatherWidgetFComponent } from "./shared/weather-widget-f/weather-widget-f.component";
import { RegisterFormComponent } from './Components/register-form/register-form.component';
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { TransitionComponent } from './shared/transition/transition.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, RegisterFormComponent, LoginPageComponent,ScrollRevealComponent, WeatherWidgetFComponent, TransitionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bwim';

  showTransition= false;
  

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showTransition = event.url !== '/';
      }
    });
  }
  onPageChange(){

    this.showTransition= true;

    setTimeout(()=>{
      
      this.showTransition= false;
    },3500)
  }
}
