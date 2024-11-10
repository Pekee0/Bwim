import { Component } from '@angular/core';
import { CharacterListComponent } from "../character/character-list/character-list.component";

@Component({
  selector: 'app-universe-pages',
  standalone: true,
  imports: [CharacterListComponent],
  templateUrl: './universe-pages.component.html',
  styleUrl: './universe-pages.component.css'
})
export class UniversePagesComponent {

}
