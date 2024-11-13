import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { UpdateUserPageComponent } from './user/pages/update-user-page/update-user-page.component';
import { AddUserComponent } from './user/components/add-user/add-user.component';
import { ListUserComponent } from './user/components/list-user/list-user.component';
import { LogInPageComponent } from './user/pages/log-in-page/log-in-page.component';
import { ScrollRevealComponent } from './scroll-reveal/scroll-reveal.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { AboutComponent } from './pages/about/about.component';
import { UniversePagesComponent } from './universe/universe-pages/universe-pages.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MinigamesPageComponent } from './pages/minigames-page/minigames-page.component';

export const routes: Routes = [
    {
        path: '',
        component: ScrollRevealComponent
    },
    {
        path: 'projects',
        component: ProjectPageComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'universe',
        component: UniversePagesComponent
    },
    {
        path: 'minigames',
        component: MinigamesPageComponent
    },
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
      path:'login',
      component:LoginPageComponent
    },
    {
        path: 'register',
        component: RegisterPageComponent
    },
    {
      path:'allUsers/update/:id',
      redirectTo:'update/:id'
    },
    {
        path: '**',
        component: ScrollRevealComponent
    }
];
