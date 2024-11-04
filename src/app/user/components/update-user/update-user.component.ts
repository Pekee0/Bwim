import { Component, OnInit, inject } from '@angular/core';
import { User } from '../../../interfaces/user.interface';
import { UsersService } from '../../../service/users.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit{
  /* Variables para que se muestren en el html :) */
  displayedName: string = '';
  displayedSurname: string = '';
  displayedEmail: string = '';
  displayedNickname:string = '';


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      {
        next:(param)=>{
          this.id = param.get('id');
          this.getUserByID(this.id);
        },error:(e:Error)=>{
          console.log(e.message);
        }
      }
      )
  }

  id:string | null = null;

  fb = inject(FormBuilder);
  usersService = inject(UsersService);
  activatedRoute = inject(ActivatedRoute);

  formulario = this.fb.nonNullable.group(
    {
      id:'',
      nickname:'',
      name:'',
      surname:'',
      email:'',
      password:'',
      admin:[false]
    }
  )

  getUserByID(id:string | null){
    this.usersService.getUser_ById(id).subscribe({
      next:(user:User)=>{
        this.formulario.patchValue(user);

        this.displayedName = user.name;
        this.displayedSurname = user.surname;
        this.displayedEmail = user.email;
        this.displayedNickname = user.nickname;
      }
    })
  }

  updateUserName(){
    if(this.formulario.invalid) return;

    const name = this.formulario.controls['name'].value;
    this.usersService.patch_UserName(name,this.id).subscribe({
      next:()=>{
          this.displayedName = name;
          console.log('Updated name...');
      },error:(e:Error)=>{
        console.log(e.message);
      }
    })
  }

  updateUserSurname(){
    if(this.formulario.invalid)return;

    const surname = this.formulario.controls['surname'].value;

    this.usersService.patch_UserSurname(surname,this.id).subscribe({
      next:()=>{
        this.displayedSurname = surname;
        console.log('Updated surname...');
      },error:(e:Error)=>{
        console.log(e.message);
      }
    })
  }

  updateUserEmail(){
    if(this.formulario.invalid)return;

    const email = this.formulario.controls['email'].value;

    this.usersService.patch_UserEmail(email,this.id).subscribe({
      next:()=>{
        this.displayedEmail = email;
        console.log('Updated email...');
      },error:(e:Error)=>{
        console.log(e.message);
      }
    })
  }

 emailValidator:string = '';

 email_validator(email:string | null){
  (!this.emailValidator)?false : true;
}

  getUserByEmail(email:string | null){
    this.usersService.getUser_ByEmail(email).subscribe({
      next:(user:User)=>{
        this.emailValidator = user.email;
      },error:(e:Error)=>{
        console.log(e.message);
      }
    })
  }
}
