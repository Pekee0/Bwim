import { Component } from '@angular/core';
import { AddCharacterComponent } from "../../components/add-character/add-character.component";

@Component({
  selector: 'app-add-character-page',
  standalone: true,
  imports: [AddCharacterComponent],
  templateUrl: './add-character-page.component.html',
  styleUrl: './add-character-page.component.css'
})
export class AddCharacterPageComponent {

}
