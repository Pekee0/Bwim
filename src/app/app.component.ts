import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component'
import { LoginFormComponent } from './Components/login-form/login-form.component';
import { ScrollRevealComponent } from "./scroll-reveal/scroll-reveal.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, LoginFormComponent, ScrollRevealComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bwim';
}
