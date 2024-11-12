import { Component } from '@angular/core';
import { ListCharacterComponent } from "../../components/list-character/list-character.component";

@Component({
  selector: 'app-list-character-page',
  standalone: true,
  imports: [ListCharacterComponent],
  templateUrl: './list-character-page.component.html',
  styleUrl: './list-character-page.component.css'
})
export class ListCharacterPageComponent {

}
