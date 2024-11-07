import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { User } from '../../../interfaces/user.interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';
import { NicknameValidatorService } from '../../directives/check-nickname-exists.directive';
import { EmailValidatorService } from '../../directives/check-email-exists.directive';
import { passWordMatchValidator } from '../../directives/password-match-validator.directive';
import { passwordValidator } from '../../directives/password.validator';

@Component({
  selector: 'app-my-info',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './my-info.component.html',
  styleUrl: './my-info.component.css'
})
export class MyInfoComponent implements OnInit {

  /*Variables que sirven para mostrar en el momento que se actualizan (sin tener que recargar la página)*/
  id:string | null = null;
  pNickname:string | null = null;
  pName:string | null = null;
  pSurname:string | null = null;
  pEmail:string | null = null;
  pPassword:string | null = null;

  fb = inject(FormBuilder);
  userService = inject(UserService);
  activatedRoute = inject(ActivatedRoute);
  private router = inject(Router); // Se usa para redireccionar la pagina


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next:(param)=>{
        this.id = param.get('id');
        this.loadInformation();
      }
    })
  }

  loadInformation(): void {
    this.userService.getUser_ById(this.id).subscribe({
      next:(user:User)=>{
        this.pNickname = user.nickname;
        this.pName = user.name;
        this.pSurname= user.surname;
        this.pEmail= user.email;
      },error:(e:Error)=>{
        console.log(e.message);
      }
    })
  }

  goBack() {
    this.router.navigate(['/allUsers']);
  }


  /************************************************ Modal Nickname ************************************************/
  nicknameValidatorService = inject(NicknameValidatorService);
  isModalOpenNickname = false;

  formNickname = this.fb.nonNullable.group({
    newNickname:['',[Validators.required,Validators.minLength(3)],[this.nicknameValidatorService.checkNicknameExists()]]
  })

  openNicknameModal() {
    this.isModalOpenNickname = true;
  }

  closeModalNickname() {
    this.isModalOpenNickname = false;
  }

  updateNickname(){
    if(this.formNickname.invalid)return;

    const nickname = this.formNickname.controls['newNickname'].value;
    this.userService.patch_UserNickname(nickname,this.id).subscribe({
      next:(user:User)=>{
        this.pNickname = user.nickname;
        console.log('Updated!');
      },error:(e:Error)=>{
        console.log(e.message);

      }
    })
    this.formNickname.reset();
    this.closeModalNickname();
  }
  /************************************************Modal Name************************************************/
  isModalOpenName = false;

  formName = this.fb.nonNullable.group({
    newName:['',[Validators.required,Validators.minLength(8)]]
  })

  openModalName(){
    this.isModalOpenName = true;
  }
  closeModalName(){
    this.isModalOpenName = false;
  }

  updateName(){
    if(this.formName.invalid)return;
    const name = this.formName.controls['newName'].value;

    this.userService.patch_UserName(name,this.id).subscribe({
      next:(user:User)=>{
        this.pName = user.name;
        console.log('Updated!');
      },error:(e:Error)=>{
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
  newEmail:['',[Validators.required,Validators.minLength(3),Validators.email],[this.emailValidatorService.checkEmailExists()]]
});

openModalEmail(){
  this.isModalOpenEmail = true;
}
closeModalEmail(){
  this.isModalOpenEmail = false;
}

updateEmail(){
  if(this.formEmail.invalid)return;

  const email = this.formEmail.controls['newEmail'].value;

  this.userService.patch_UserEmail(email,this.id).subscribe({
    next:(user:User)=>{
      this.pEmail = user.email;
      console.log('Updated!');
    },error:(e:Error)=>{
      console.log(e.message);
    }
  });
  this.formEmail.reset();
  this.closeModalEmail();
  }

/************************************************Modal Surname************************************************/
isModalOpenSurname = false;

formSurname = this.fb.nonNullable.group({
  newSurname:['',[Validators.required,Validators.minLength(3)]]
});

openModalSurname(){
  this.isModalOpenSurname = true;
}
closeModalSurname(){
  this.isModalOpenSurname = false;
}

updateSurname(){
  if(this.formSurname.invalid)return;

  const surname = this.formSurname.controls['newSurname'].value;

  this.userService.patch_UserSurname(surname,this.id).subscribe({
    next:(user:User)=>{
      this.pSurname = user.surname;
      console.log('Updated!');
    },error:(e:Error)=>{
      console.log(e.message);
    }
  });
  this.formSurname.reset();
  this.closeModalSurname();
  }



/************************************************Modal Password************************************************/

isModalOpenPassword = false;

formPassword = this.fb.nonNullable.group({
  currentPassword:['',[Validators.required],[passwordValidator(this.userService,this.id)]],
  password:['',[Validators.required]],
  confirmPassword:['',[Validators.required]],
},{
  validators:passWordMatchValidator
})

openModalPassword(){
  this.isModalOpenPassword = true;
}

closeModalPassword(){
  this.isModalOpenPassword = false;
}

updatePassword(){
  if(this.formPassword.invalid)return;

  const password =  this.formPassword.controls['password'].value;
  this.userService.patch_UserPassword(password,this.id).subscribe({
    next:(user:User)=>{
      this.pPassword = user.password;
      console.log('Updated!');
    },error:(e:Error)=>{
      console.log(e.message);
    }
  });
  this.formPassword.reset();
  this.closeModalPassword();
}
}


