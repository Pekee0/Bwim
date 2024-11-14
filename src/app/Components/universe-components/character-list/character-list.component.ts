import { Component, inject, OnInit } from '@angular/core';
import { CharacterCardComponent } from "../character-card/character-card.component";
import { CommonModule, NgForOf } from '@angular/common';
import { CharactersService } from '../../../service/characters.service';
import { Character } from '../../../interfaces/universeCharacter.interface';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CharacterCardComponent, NgForOf, CommonModule],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.css'
})
export class CharacterListComponent implements OnInit {
  ngOnInit(): void {
    this.listCharacters()
  }

  service = inject(CharactersService)

  listCharacters() {
    this.service.getCharacters().subscribe(
      {
        next: (characters: Character[]) => this.characterList = characters
        ,
        error: (e: Error) => console.error(e.message)
      }
    )
  }

  characterList: Character[] = []

}
