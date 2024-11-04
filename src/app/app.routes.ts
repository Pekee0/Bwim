import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { UpdateUserPageComponent } from './user/pages/update-user-page/update-user-page.component';
import { AddUserComponent } from './user/components/add-user/add-user.component';
import { ScrollRevealComponent } from './scroll-reveal/scroll-reveal.component';
import { ListUserComponent } from './user/components/list-user/list-user.component';

export const routes: Routes = [
  {
    path:'allUsers',
    component:ListUserComponent
  },
  {
    path:'signIn',
    component:AddUserComponent
  },
  {
    path:'',
    component:ScrollRevealComponent
  },
  {
    path:'update/:id',
    component:UpdateUserPageComponent
  },
  {
    path:'allUsers/update/:id',
    redirectTo:'update/:id'
  },
  {
    path:'log-in',
    component:AddUserComponent
  },
  {
    path:'**',
    redirectTo:''
  }
];
