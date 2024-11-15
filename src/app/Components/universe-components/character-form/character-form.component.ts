import { Character } from './../../../interfaces/universeCharacter.interface';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CharactersService } from '../../../service/characters.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './character-form.component.html',
  styleUrl: './character-form.component.css'
})
export class CharacterFormComponent {
  fb = inject(FormBuilder)
  characterService = inject(CharactersService)

  form = this.fb.nonNullable.group(
    {
      id: ['', Validators.required],
      name: ['', Validators.required],
      nickname: [''],
      description: ['', Validators.required],
      birthDate: [''],
      deathDate: [''],
      projectName: [''],
      birthPlace: [''],
      images: ['', Validators.required]
    }
  )

  router = inject(Router)

  addCharacter() {
    if (this.form.invalid) return

    const character = this.form.getRawValue()

    this.addCharacterDB(character)

    this.router.navigateByUrl('universe')
  }

  addCharacterDB(character: Character) {
    this.characterService.postCharacter(character).subscribe(
      {
        next: (character) => {
          console.log(`${character.name} ha sido cargado con éxito!`)
        },
        error: (e: Error) => {
          console.error(e.message)
        }
      }
    )
  }

  imgUrl: string | ArrayBuffer | null | undefined = null;
  onImageChange(event: any) {
    const file = event.target.files[0]; // Se obtiene el archivo seleccionado.

    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imgUrl = reader.result as string; // Almacena la URL de la imagen en base64
          console.log(this.imgUrl);

          // Actualiza el control 'images' en el formulario con el valor en base64
          this.form.get('images')?.setValue(this.imgUrl);
        };
        reader.readAsDataURL(file); // Lee el archivo como una URL en base64;
      } else {
        alert('Por favor, sube un archivo de imagen válido.');
        this.form.get('images')?.setValue('null');
      }
    }
  }

}
