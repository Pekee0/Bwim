import { Component, OnInit, inject } from '@angular/core';
import { User } from '../../../interfaces/user.interface';
import { UsersService } from '../../../service/users.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';

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
  private router = inject(Router) //Lo utilizo para redireccionar la pagina


  formulario = this.fb.nonNullable.group(
    {
      id:'',
      nickname:['',[Validators.required]],
      name:['',[Validators.required]],
      surname:['',[Validators.required]],
      email:['',[Validators.required]],
      password:['',[Validators.required]],
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

  updateUserEmail() {
    const email = this.formulario.controls['email'].value;
    this.checkEmailExists(email).subscribe(exists => {
      if (exists) {
        // El email ya existe
        alert('Email already exists...');
      } else {
        this.usersService.patch_UserEmail(email,this.id).subscribe({
          next:(user:User)=>{
            this.displayedEmail=user.email;
            console.log(user);
            console.log('Updated email!');
          },error:(e:Error)=>{
            console.log(e.message);
          }
        })
      }
    });
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.usersService.getUser_ByEmail(email).pipe(
      map(users => users.length > 0) // Devuelve true si hay usuarios con ese email
    );
  }

  updateUserNickname()
  {
    const nickname = this.formulario.controls['nickname'].value;
    this.checkNicknameExists(nickname).subscribe(exists => {
      if (exists) {
        // El nickname ya existe
        alert('Nickname already exists...');
      } else {
        this.usersService.patch_UserNickname(nickname,this.id).subscribe({
          next:(user:User)=>{
            this.displayedNickname=user.nickname;
            console.log(user);
            console.log('Updated nickname!');
          },error:(e:Error)=>{
            console.log(e.message);
          }
        })
      }
    });
  };

  checkNicknameExists(nickname: string): Observable<boolean> {
    return this.usersService.getUser_ByNickname(nickname).pipe(
      map(users => users.length > 0) // Devuelve true si hay usuarios con ese nickname
    );
  }

  updateUserPassword(){
    const password = this.formulario.controls['password'];

  }

  goBack(){
    this.router.navigate(['/allUsers'])
  }

}
