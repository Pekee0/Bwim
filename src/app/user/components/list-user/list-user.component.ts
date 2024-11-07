import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { User } from '../../../interfaces/user.interface';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [RegisterComponent,RouterModule],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})
export class ListUserComponent implements OnInit{

  ngOnInit(): void {
    this.listUsers();
  }
  usersList: User[] = [];


  userService = inject(UserService)

  addUser(user:User){
    this.usersList.push({...user})
  }

  listUsers(){
    this.userService.getUsers().subscribe(
      {
        next:(users:User[])=>{
          this.usersList = users
        },
        error:(e:Error)=>{
          console.log(e.message);
        }
      }
    );
  }

  delete(id:string | undefined){
    this.userService.deleteUser(id).subscribe(
      {
        next:()=>{

        },error:(e:Error)=>{
          console.log(e.message)
        }
      }
    );
  }
}
