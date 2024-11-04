import { Component,EventEmitter, Output, inject } from '@angular/core';
import { Character } from '../../../interfaces/character.interface';
import { ReactiveFormsModule, FormBuilder, Validators } from "@angular/forms";
import { CharactersService } from '../../../service/characters.service';
@Component({
  selector: 'app-add-character',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-character.component.html',
  styleUrl: './add-character.component.css'
})
export class AddCharacterComponent {
  @Output()emitirCharacter:EventEmitter<Character> = new EventEmitter();

  fb = inject(FormBuilder)
  charactersService = inject(CharactersService)

  formulario = this.fb.nonNullable.group({
    name:['',[Validators.required]],
    age:['',[Validators.required]],
    description:['',[Validators.required]],
    birthday:['',[Validators.required]],
    proyectId:['',[Validators.required]]
  })

  addCharacter(){
    if(this.formulario.invalid)return;
    const character = this.formulario.getRawValue();
    //this.addCharacterDB(character);
    //this.emitirCharacter.emit(character)
  }

  addCharacterDB(character:Character){
    this.charactersService.postCharacter(character).subscribe({
      next:()=>{
        console.log(character);
        alert('Personaje guardado...')
      },
      error:(e:Error)=>{
        console.log(e.message)
      }
    });
  }
}
