import { Component,EventEmitter, Output, inject } from '@angular/core';
import { Character } from '../../../interfaces/character.interface';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray } from "@angular/forms";
import { CharactersService } from '../../../service/characters.service';
@Component({
  selector: 'app-add-character',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-character.component.html',
  styleUrl: './add-character.component.css'
})
export class AddCharacterComponent {

  fb = inject(FormBuilder)
  charactersService = inject(CharactersService)

  formulario = this.fb.nonNullable.group({
    name:['',[Validators.required]],
    age:['',[Validators.required]],
    description:['',[Validators.required]],
    birthdate:['',[Validators.required]],
    projectId:['',[Validators.required]],
    images:[]
  })

  addCharacter(){
    if(this.formulario.invalid)return;
    const character:Character = this.formulario.getRawValue();
    character.images = this.imgList;
    this.charactersService.postCharacter(character).subscribe({
      next:()=>{
        console.log(character);
        alert('Saved character!');
      },error:(e:Error)=>{
        console.log(e.message);
      }
    })
  }

  imgList:string[]=[];

  imgUrl:string | ArrayBuffer | null = null;

  onImageChange(event:any){
    const file = event.target.files[0]; //Se obtiene el archivo seleccionado.

    if(file){
      if(file.type.startsWith('image/')){
      const reader = new FileReader();
      reader.onload = ()=>{
        this.imgUrl = reader.result as string; //Almacen a la URL de la imagen
        if(this.imgUrl)
          this.imgList.push(this.imgUrl);
      };
      reader.readAsDataURL(file); //Lee el archivo como una URL;
    }else{
      alert('Please upload a valid image file.');
      this.imgUrl=null;
    }
    }

  }
}
