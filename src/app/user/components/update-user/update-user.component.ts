import { Component, OnInit, inject } from '@angular/core';
import { User } from '../../../interfaces/user.interface';
import { UserService } from '../../../service/user.service';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { EmailValidatorService } from '../../directives/check-email-exists.directive';
import { NicknameValidatorService } from '../../directives/check-nickname-exists.directive';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css',
})
export class UpdateUserComponent implements OnInit {
  /* Variables para que se muestren en el html :) */
  pName: string = '';
  pSurname: string = '';
  pEmail: string = '';
  pNickname: string = '';

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (param) => {
        this.id = param.get('id');
        if (this.id) {
          this.loadInformation();
        } else {
          console.error("ID not found");
        }
      },
      error: (e: Error) => {
        console.log(e.message);
      },
    });
  }


  id: string | null = null;

  fb = inject(FormBuilder);
  userService = inject(UserService);
  activatedRoute = inject(ActivatedRoute);
  private router = inject(Router); //Lo utilizo para redireccionar la pagina

  emailValidatorService = inject(EmailValidatorService);
  nicknameValidatorService = inject(NicknameValidatorService);

  formulario = this.fb.nonNullable.group({
    id: '',
    nickname: [
      '',
      [Validators.required,Validators.minLength(3)],
      [this.nicknameValidatorService.checkNicknameExists()]
    ],
    name: ['', [Validators.required]],
    surname: ['', [Validators.required]],
    email: [
      '',
      [Validators.required,Validators.email,Validators.minLength(3)],
      [this.emailValidatorService.checkEmailExists()]
    ],
    password: ['', [Validators.required]],
    admin: [false],
    newPassword: '',
  });

  loadInformation() {
    this.userService.getUser_ById(this.id).subscribe({
      next: (user: User) => {
        this.pName = user.name;
        this.pSurname = user.surname;
        this.pEmail = user.email;
        this.pNickname = user.nickname;
      },
    });
  }

  updateUserName() {
    if (this.formulario.invalid) return;

    const name = this.formulario.controls['name'].value;
    this.userService.patch_UserName(name, this.id).subscribe({
      next: () => {
        this.pName = name;
        console.log('Updated name...');
      },
      error: (e: Error) => {
        console.log(e.message);
      },
    });
  }

  updateUserSurname() {
    if (this.formulario.invalid) return;

    const surname = this.formulario.controls['surname'].value;

    this.userService.patch_UserSurname(surname, this.id).subscribe({
      next: () => {
        this.pSurname = surname;
        console.log(this.pSurname);
        console.log('Llego?');
        console.log('Updated surname...');
      },
      error: (e: Error) => {
        console.log(e.message);
      },
    });
  }

  updateUserEmail() {
    if(this.formulario.invalid)return;
    const email = this.formulario.controls['email'].value;
    this.userService.patch_UserEmail(email,this.id).subscribe({
          next:(user:User)=>{
            this.pEmail=user.email;
            console.log(user);
            console.log('Updated email!');
          },error:(e:Error)=>{
            console.log(e.message);
          }
    });
  }

  updateUserNickname()
  {
    if(this.formulario.invalid)return;

    const nickname = this.formulario.controls['nickname'].value;
    this.userService.patch_UserNickname(nickname,this.id).subscribe({
    next:(user:User)=>{
      this.pNickname=user.nickname;
      console.log(user);
      console.log('Updated nickname!');
    },error:(e:Error)=>{
        console.log(e.message);
      }
    })
  };

  updateUserPassword() {
    if(this.formulario.invalid)return;
    const password = this.formulario.controls['newPassword'];
  }

  goBack() {
    this.router.navigate(['/allUsers']);
  }
}
