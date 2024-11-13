import { Component } from '@angular/core';

import { RegisterFormComponent } from "../../../Components/user-components/register-form/register-form.component";


@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RegisterFormComponent, RegisterFormComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

}
