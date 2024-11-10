import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd  } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component'
import { ScrollRevealComponent } from "./scroll-reveal/scroll-reveal.component";
import { WeatherWidgetFComponent } from "./shared/weather-widget-f/weather-widget-f.component";
import { RegisterFormComponent } from './Components/register-form/register-form.component';
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { TransitionComponent } from './shared/transition/transition.component';
import { AboutComponent } from './pages/about/about.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, RegisterFormComponent, LoginPageComponent,ScrollRevealComponent, WeatherWidgetFComponent, TransitionComponent, AboutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    // Reinicia el scroll al inicio en cada cambio de ruta
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }
}





// export class AppComponent implements OnInit{
//   title = 'bwim';

//   // showTransition= false;
  

//   constructor(private router: Router) {

    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     this.showTransition = event.url !== '/';
    //   }
    // });
     
  // onPageChange(){

  //   this.showTransition= true;

  //   setTimeout(()=>{
      
  //     this.showTransition= false;
  //   },3500)
  // }
//   }

// }
