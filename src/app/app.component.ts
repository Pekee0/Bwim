import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component'
import { ScrollRevealComponent } from "./scroll-reveal/scroll-reveal.component";
import { RegisterFormComponent } from './Components/register-form/register-form.component';
import { LoginPageComponent } from "./pages/login-page/login-page.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, RegisterFormComponent, LoginPageComponent,ScrollRevealComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bwim';
}
