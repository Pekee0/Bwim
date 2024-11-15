import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd  } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component'
import { ScrollRevealComponent } from "./Components/scroll-reveal/scroll-reveal.component";
import { WeatherWidgetFComponent } from "./shared/weather-widget-f/weather-widget-f.component";
import { RegisterFormComponent } from './Components/user-components/register-form/register-form.component';
import { FooterComponent } from "./shared/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, RegisterFormComponent,ScrollRevealComponent, WeatherWidgetFComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
  
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
