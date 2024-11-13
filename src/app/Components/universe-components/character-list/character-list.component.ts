import { Component, OnInit } from '@angular/core';
import { UniverseCharacter } from '../../../interfaces/universeCharacter.interface';
import { CardComponent } from "../card/card.component";
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CardComponent, NgForOf],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.css'
})
export class CharacterListComponent implements OnInit {
  ngOnInit(): void {

  }

  characterList: UniverseCharacter[] = [
    {
      id: '1',
      name: 'Dami',
      age: '',
      description: 'La joven promesa',
      birthdate: '',
      projectId: '',
      images: ['/assets/imgs/dami.png']
    },
    {
      id: '2',
      name: 'Gaby',
      age: '',
      description: 'El traidor',
      birthdate: '',
      projectId: '',
      images: ['/assets/imgs/gabi.png']
    }
  ]

}
