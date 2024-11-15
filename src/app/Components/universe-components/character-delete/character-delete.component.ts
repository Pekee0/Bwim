import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CharactersService } from '../../../service/characters.service';
import { Character } from '../../../interfaces/universeCharacter.interface';
@Component({
  selector: 'app-character-delete',
  standalone: true,
  imports: [],
  templateUrl: './character-delete.component.html',
  styleUrl: './character-delete.component.css'
})
export class CharacterDeleteComponent {


  fb = inject(FormBuilder);
  characterService = inject(CharactersService);

  characterForm = this.fb.nonNullable.group(
    {
      name: ['']
    }
  )


  name: string = ''
  buscar(evento: string) {

    if (this.characterForm.invalid) return

    this.name = evento

    this.characterService.getCharacter_ByName(this.name).subscribe({
      next: (character: Character[]) => {
        const [selectedCharacter] = character
        if (selectedCharacter) {
          this.confirm(selectedCharacter)
        } else {
          alert('Personaje no encontrado');
        }
      },
      error: (error: Error) => alert('Error al buscar el personaje: ' + error.message)
    });
  }

  confirm(character: Character) {
    const { name, id } = character
    const confirmDelete = confirm(`¿Estás seguro de que deseas eliminar a ${name}?`);
    if (confirmDelete && id) {
      this.borrar(id)
    }
  }

  borrar(id: string) {
    this.characterService.deleteCharacter(id!).subscribe({
      next: () => alert('Personaje eliminado exitosamente'),
      error: (error: Error) => console.log('Error al eliminar el personaje: ' + error.message)
    })
  }

}
