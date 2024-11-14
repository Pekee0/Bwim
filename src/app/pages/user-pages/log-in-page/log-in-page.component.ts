import { Component } from '@angular/core';
import { LogInComponent } from '../../../Components/user-components/log-in/log-in.component';

@Component({
  selector: 'app-log-in-page',
  standalone: true,
  imports: [LogInComponent],
  templateUrl: './log-in-page.component.html',
  styleUrl: './log-in-page.component.css'
})
export class LogInPageComponent {

}
