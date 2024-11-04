import { Component } from '@angular/core';
import { UpdateUserComponent } from '../../components/update-user/update-user.component';

@Component({
  selector: 'app-update-user-page',
  standalone: true,
  imports: [UpdateUserComponent],
  templateUrl: './update-user-page.component.html',
  styleUrl: './update-user-page.component.css'
})
export class UpdateUserPageComponent {

}
