import { Character } from './../../../interfaces/universeCharacter.interface';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CharactersService } from '../../../service/characters.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-character-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './character-form.component.html',
  styleUrl: './character-form.component.css'
})
export class CharacterFormComponent {

  fb = inject(FormBuilder)
  characterService = inject(CharactersService)

  form = this.fb.nonNullable.group(
    {
      id: [''],
      name: ['',Validators.required],
      nickname: ['',Validators.required],
      description: ['',Validators.required],
      birthDate: [''],
      deathDate: [''],
      projectName: this.fb.array([this.fb.control('',[Validators.required])]),
      birthPlace: [''],
      images: this.fb.array([this.fb.control('',[Validators.required])])
    }
  )

  get projectName() {
    return this.form.get('projectName') as FormArray
  }

  addProjectName() {
    this.projectName.push(this.fb.control('',[Validators.required]))
  }

  get images() {
    return this.form.get('images') as FormArray
  }

  addImages() {
    this.images.push(this.fb.control('',[Validators.required]))
  }

  addCharacter() {
    if (this.form.invalid) return

    const character = this.form.getRawValue()

    this.addCharacterDB(character)
  }

  addCharacterDB(character:Character) {
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
}
