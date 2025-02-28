import { Component, OnInit, Renderer2, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { User } from '../../../interfaces/user.interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmailValidatorService } from '../Validaciones/check-email-exists.directive';
import { NicknameValidatorService } from '../Validaciones/check-nickname-exists.directive';
import { passWordMatchValidator } from '../Validaciones/password-match-validator.directive';
import { AuthFirebaseService } from '../auth/service/auth-firebase.service';

@Component({
  selector: 'app-my-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './my-info.component.html',
  styleUrl: './my-info.component.css'
})
export class MyInfoComponent implements OnInit {

  /*Variables que sirven para mostrar en el momento que se actualizan (sin tener que recargar la página)*/
  id: string | null = null;
  pNickname: string | null = null;
  pName: string | null = null;
  pSurname: string | null = null;
  pEmail: string | null = null;
  pPassword: string | null = null;
  pUrl: string | null | undefined = null
  /****************************************************************************************************** */

  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);
  private renderer = inject(Renderer2);
  private activo:any;
  private auth = inject(AuthFirebaseService)

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'body-blur');
    this.id = localStorage.getItem('UsuarioActivo');
    this.cargarInfo();
  }
  ngOnDestroy(): void {

    this.renderer.removeClass(document.body, 'body-blur');
  }

  cargarInfo(){
    this.userService.getInfoUser().subscribe({
      next: (users: User[]) => {
        let userActivo = users.find(user => user.id === this.id);
        if (userActivo) {
          this.pNickname = userActivo.nickname;
          this.pName = userActivo.name;
          this.pSurname = userActivo.surname;
          this.pEmail = userActivo.email;
          this.pUrl = userActivo.imgPerfil;
          this.activo = userActivo;
        }
      }
    });
  }

  goBack() {
    this.router.navigate(['']);
  }


  /************************************************ Modal Nickname ************************************************/
  nicknameValidatorService = inject(NicknameValidatorService);
  isModalOpenNickname = false;

  formNickname = this.fb.nonNullable.group({
    newNickname: ['', [Validators.required, Validators.minLength(3)], [this.nicknameValidatorService.nicknameExists()]]
  })

  openNicknameModal() {
    this.isModalOpenNickname = true;
  }

  closeModalNickname() {
    this.isModalOpenNickname = false;
    this.formNickname.reset();
  }

  updateNickname() {
    if (this.formNickname.invalid) return;

    const nickname = this.formNickname.controls['newNickname'].value;

    if(this.activo){
      this.activo.nickname = nickname;
      const nuevo = this.userService.toUserCreate(this.activo);
      this.userService.update(nuevo,this.id!);
      console.log('Updated!');
    }else{
      console.log('Error!');
    }
    this.formNickname.reset();
    this.closeModalNickname();
  }
  /************************************************Modal Name************************************************/
  isModalOpenName = false;

  formName = this.fb.nonNullable.group({
    newName: ['', [Validators.required, Validators.minLength(3)]]
  })

  openModalName() {
    this.isModalOpenName = true;
  }
  closeModalName() {
    this.isModalOpenName = false;
    this.formName.reset();
  }

  updateName() {
    if (this.formName.invalid) return;
    const name = this.formName.controls['newName'].value;

    if(this.activo){
      this.activo.name = name;
      const nuevo = this.userService.toUserCreate(this.activo);
      this.userService.update(nuevo,this.id!);
      console.log('Updated!');
    }else{
      console.log('Error!');
    }

    this.formName.reset();
    this.closeModalName();
  }

  /************************************************Modal Email************************************************/
  emailValidatorService = inject(EmailValidatorService);
  isModalOpenEmail = false;

  formEmail = this.fb.nonNullable.group({
    newEmail: ['', [Validators.required, Validators.minLength(3), Validators.email], [this.emailValidatorService.emailExists()]],
    passw:['']
  });

  openModalEmail() {
    this.isModalOpenEmail = true;
  }
  closeModalEmail() {
    this.isModalOpenEmail = false;
    this.formEmail.reset();
  }

  updateEmail() {
    if (this.formEmail.invalid) return;

    const email = this.formEmail.controls['newEmail'].value;

    if(this.activo){
      this.activo.email = email;
      const nuevo = this.userService.toUserCreate(this.activo);
      this.userService.update(nuevo,this.id!);
      console.log('Updated!');
    }else{
      console.log('Error!');
    }

    this.formEmail.reset();
    this.closeModalEmail();
  }

  /************************************************Modal Surname************************************************/
  isModalOpenSurname = false;

  formSurname = this.fb.nonNullable.group({
    newSurname: ['', [Validators.required, Validators.minLength(3)]]
  });

  openModalSurname() {
    this.isModalOpenSurname = true;
  }
  closeModalSurname() {
    this.isModalOpenSurname = false;
    this.formSurname.reset();
  }

  updateSurname() {
    if (this.formSurname.invalid) return;

    const surname = this.formSurname.controls['newSurname'].value;

    if(this.activo){
      this.activo.surname = surname;
      const nuevo = this.userService.toUserCreate(this.activo);
      this.userService.update(nuevo,this.id!);
      console.log('Updated!');
    }else{
      console.log('Error!');
    }

    this.formSurname.reset();
    this.closeModalSurname();
  }



  /************************************************Modal Password************************************************/

  isModalOpenPassword = false;

  formPassword = this.fb.nonNullable.group({
    currentPassword: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
  }, {
    validators: passWordMatchValidator
  })

  async openModalPassword() {
    try{

      this.isModalOpenPassword = true;
      await this.updatePassword();
    }catch(err){

    }

  }

  closeModalPassword() {
    this.isModalOpenPassword = false;
    this.formPassword.reset();
  }

  async updatePassword() {
  try{
      await this.auth.recuperarPassword(this.activo.email);
  }catch(err){
    console.log(err);

  }
  }

  passwordCorrect(p: string): boolean {
    return this.pPassword === p;
  }

  /************************************************Modal Imagen************************************************/
  isModalOpenImage = false;

  openImageModal() {
    this.isModalOpenImage = true;
  }

  closeImageModal() {
    this.isModalOpenImage = false;
  }

  formImage = this.fb.nonNullable.group({
    imageUrl: ['', [Validators.required]]
  })

  imgUrl: string | ArrayBuffer | null | undefined = null;

  onImageChange(event: any) {
    const file = event.target.files[0]; //Se obtiene el archivo seleccionado.

    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imgUrl = reader.result as string; //Almacen a la URL de la imagen
          console.log(this.imgUrl);
        };
        reader.readAsDataURL(file); //Lee el archivo como una URL;
      } else {
        alert('Please upload a valid image file.');
        this.imgUrl = null;
      }
    }
  }

  updateImage() {
    if (this.formImage.invalid) return;

    if(this.activo){
      this.activo.imgPerfil = this.imgUrl;
      console.log(this.imgUrl);

      const nuevo = this.userService.toUserCreate(this.activo);
      console.log(nuevo.imgPerfil);
      this.userService.update(nuevo,this.id!);
      console.log('Updated!');
    }else{
      console.log('Error!');
    }
    //this.formImage.reset();
    this.closeImageModal();
  }

  /***************************************************************************************** */



}


