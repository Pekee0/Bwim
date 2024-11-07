import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { UpdateUserPageComponent } from './user/pages/update-user-page/update-user-page.component';
import { ListUserComponent } from './user/components/list-user/list-user.component';
import { LogInPageComponent } from './user/pages/log-in-page/log-in-page.component';
import { ScrollRevealComponent } from './scroll-reveal/scroll-reveal.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { AboutComponent } from './pages/about/about.component';
import { UniversePagesComponent } from './universe/universe-pages/universe-pages.component';
import { RegisterPageComponent } from './user/pages/register-page/register-page.component';
import { MyInfoPageComponent } from './user/pages/my-info-page/my-info-page.component';

export const routes: Routes = [
    {
      path: '',
      component: ScrollRevealComponent
    },
    {
      path:'register',
      component: RegisterPageComponent
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
      path:'allUsers',
      component:ListUserComponent
    },
    {
      path:'',
      component:ScrollRevealComponent
    },
    {
      path:'perfil/:id',
      component:MyInfoPageComponent
    },
    {
      path:'update/:id',
      component:UpdateUserPageComponent
    },
    {
      path:'login',
      component:LogInPageComponent
    },
    {
      path:'allUsers/update/:id',
      redirectTo:'update/:id',
      pathMatch:'full'
    },
    {
      path: '**',
      component: ScrollRevealComponent
    }
];
