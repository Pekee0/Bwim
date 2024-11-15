import { Component } from '@angular/core';
import { CharacterFormComponent } from '../../../Components/universe-components/character-form/character-form.component';

@Component({
  selector: 'app-form-page',
  standalone: true,
  imports: [CharacterFormComponent],
  templateUrl: './form-page.component.html',
  styleUrl: './form-page.component.css'
})
export class FormPageComponent {

}
