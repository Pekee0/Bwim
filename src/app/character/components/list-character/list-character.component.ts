import { Component, OnInit, inject } from '@angular/core';
import { CharactersService } from '../../../service/characters.service';
import { Character } from '../../../interfaces/character.interface';

@Component({
  selector: 'app-list-character',
  standalone: true,
  imports: [],
  templateUrl: './list-character.component.html',
  styleUrl: './list-character.component.css'
})
export class ListCharacterComponent implements OnInit {
  characterService = inject(CharactersService);

  ngOnInit(): void {
    this.cargarLista();
  }

  characters:Character[] = [];

  cargarLista(){
    this.characterService.getCharacters().subscribe({
      next:(lista:Character[])=>{
        console.log(lista);
        this.characters = lista;
      },error:(e:Error)=>{
        console.log(e.message);
      }
    });
  }
}
