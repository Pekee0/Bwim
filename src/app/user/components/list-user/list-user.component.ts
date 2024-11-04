import { Component, inject, OnInit } from '@angular/core';
import { AddUserComponent } from "../add-user/add-user.component";
import { UsersService } from '../../../service/users.service';
import { User } from '../../../interfaces/user.interface';
import {RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [AddUserComponent,RouterModule],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})
export class ListUserComponent implements OnInit{

  ngOnInit(): void {
    this.listUsers();
  }
  usersList: User[] = [];


  usersService = inject(UsersService)

  addUser(user:User){
    this.usersList.push({...user})
  }

  listUsers(){
    this.usersService.getUsers().subscribe(
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
    this.usersService.deleteUser(id).subscribe(
      {
        next:()=>{

        },error:(e:Error)=>{
          console.log(e.message)
        }
      }
    );
  }
}
