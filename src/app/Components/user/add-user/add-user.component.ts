import { Component, Output, EventEmitter, inject } from "@angular/core";
import { ReactiveFormsModule, FormBuilder, Validators } from "@angular/forms";
import { User } from "../../../interfaces/user.interface";
import { UsersService } from "../../../service/users.service";

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  @Output()
  emitirUser:EventEmitter<User> = new EventEmitter();

  fb = inject(FormBuilder);
  userService= inject(UsersService);

  formulario = this.fb.nonNullable.group(
    {
    name:['',[Validators.required]],
    nickname:['',[Validators.required]],
    surname:['',[Validators.required]],
    email:['',[Validators.required]],
    password:['',[Validators.required]]
    }
  );

  addUser(){
    if(this.formulario.invalid)return;
    const user = this.formulario.getRawValue();
    console.log(user)
    this.addUserDB(user);
    this.emitirUser.emit(user);
  };

  addUserDB(user:User){
    this.userService.postUser(user).subscribe({
      next:(user:User)=>{
        console.log(user);
        alert('Usuario guardado...')
      },
      error:(e:Error)=>{
        console.log(e.message);
      }
    });
  }
}

