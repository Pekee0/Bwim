import { Component, OnInit, Renderer2, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { User } from '../../../interfaces/user.interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmailValidatorService } from '../Validaciones/check-email-exists.directive';
import { NicknameValidatorService } from '../Validaciones/check-nickname-exists.directive';
import { passWordMatchValidator } from '../Validaciones/password-match-validator.directive';



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

  fb = inject(FormBuilder);
  userService = inject(UserService);
  activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  renderer = inject(Renderer2);

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'body-blur');
    this.activatedRoute.paramMap.subscribe({
      next: (param) => {
        this.id = param.get('id');
        this.loadInformation();
      }
    })
  }
  ngOnDestroy(): void {

    this.renderer.removeClass(document.body, 'body-blur');
  }

  loadInformation(): void {
    this.userService.getUser_ById(this.id).subscribe({
      next: (user: User) => {
        this.pNickname = user.nickname;
        this.pName = user.name;
        this.pSurname = user.surname;
        this.pEmail = user.email;
        this.pUrl = user.imgPerfil;
      }, error: (e: Error) => {
        console.log(e.message);
      }
    })
  }

  goBack() {
    this.router.navigate(['']);
  }


  /************************************************ Modal Nickname ************************************************/
  nicknameValidatorService = inject(NicknameValidatorService);
  isModalOpenNickname = false;

  formNickname = this.fb.nonNullable.group({
    newNickname: ['', [Validators.required, Validators.minLength(3)], [this.nicknameValidatorService.checkNicknameExists()]]
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
    this.userService.patch_UserNickname(nickname, this.id).subscribe({
      next: (user: User) => {
        this.pNickname = user.nickname;
        console.log('Updated!');
      }, error: (e: Error) => {
        console.log(e.message);

      }
    })
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

    this.userService.patch_UserName(name, this.id).subscribe({
      next: (user: User) => {
        this.pName = user.name;
        console.log('Updated!');
      }, error: (e: Error) => {
        console.log(e.message);
      }
    });
    this.formName.reset();
    this.closeModalName();
  }

  /************************************************Modal Email************************************************/
  emailValidatorService = inject(EmailValidatorService);
  isModalOpenEmail = false;

  formEmail = this.fb.nonNullable.group({
    newEmail: ['', [Validators.required, Validators.minLength(3), Validators.email], [this.emailValidatorService.checkEmailExists()]]
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

    this.userService.patch_UserEmail(email, this.id).subscribe({
      next: (user: User) => {
        this.pEmail = user.email;
        console.log('Updated!');
      }, error: (e: Error) => {
        console.log(e.message);
      }
    });
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

    this.userService.patch_UserSurname(surname, this.id).subscribe({
      next: (user: User) => {
        this.pSurname = user.surname;
        console.log('Updated!');
      }, error: (e: Error) => {
        console.log(e.message);
      }
    });
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

  openModalPassword() {
    this.isModalOpenPassword = true;
  }

  closeModalPassword() {
    this.isModalOpenPassword = false;
    this.formPassword.reset();
  }

  updatePassword() {

    if (this.formPassword.invalid) return;

    const password = this.formPassword.controls['password'].value;

    if (!this.passwordCorrect(password)) {
      alert('Wrong Password');
      this.formPassword.reset();
      return
    }
    this.userService.patch_UserPassword(password, this.id).subscribe({
      next: (user: User) => {
        this.pPassword = user.password;
        console.log('Updated!');
      }, error: (e: Error) => {
        console.log(e.message);
      }
    });
    this.formPassword.reset();
    this.closeModalPassword();
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
    this.userService.patch_UserImage(this.imgUrl, this.id).subscribe({
      next: (user: User) => {
        console.log(this.imgUrl)
        this.pUrl = user.imgPerfil;
        console.log(this.imgUrl)
      }, error: (e: Error) => {
        console.log(e.message);
      }
    })
    this.formImage.reset();
    this.closeImageModal();
    window.location.reload();
  }



}


