import { Component, inject, OnInit } from '@angular/core';
import { CharacterCardComponent } from "../character-card/character-card.component";
import { CommonModule, NgForOf } from '@angular/common';
import { CharactersService } from '../../../service/characters.service';
import { Character } from '../../../interfaces/universeCharacter.interface';
import { AuthService } from '../../../auth/service/auth.service';
import { RouterLink } from '@angular/router';
import { SsMenuComponent } from "../../ss-menu/ss-menu.component";

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CharacterCardComponent, NgForOf, CommonModule, RouterLink, SsMenuComponent],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.css'
})
export class CharacterListComponent implements OnInit {
  ngOnInit(): void {
    this.listCharacters()
    if (localStorage.getItem('tokenAdmin')) {
      this.authService.isAdmin = true;
    }
  }

  authService = inject(AuthService)

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
