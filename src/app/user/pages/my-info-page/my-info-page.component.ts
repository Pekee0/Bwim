import { Component } from '@angular/core';
import { MyInfoComponent } from '../../components/my-info/my-info.component';

@Component({
  selector: 'app-my-info-page',
  standalone: true,
  imports: [MyInfoComponent],
  templateUrl: './my-info-page.component.html',
  styleUrl: './my-info-page.component.css'
})
export class MyInfoPageComponent {

}
