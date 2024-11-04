import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component'
import { LoginFormComponent } from './Components/login-form/login-form.component';
import { ScrollRevealComponent } from "./scroll-reveal/scroll-reveal.component";
import { AddUserComponent } from "./user/components/add-user/add-user.component";
import { ListUserComponent } from './user/components/list-user/list-user.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, LoginFormComponent, ScrollRevealComponent,ListUserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bwim';
}
