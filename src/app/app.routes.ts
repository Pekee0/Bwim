import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LogInPageComponent } from './pages/user-pages/log-in-page/log-in-page.component';
import { ScrollRevealComponent } from './Components/scroll-reveal/scroll-reveal.component';
import { ProjectPageComponent } from './Components/project-components/project-page/project-page.component';
import { AboutComponent } from './pages/about/about.component';
import { UniversePagesComponent } from './pages/universe-pages/universe-pages.component';
import { authGuardFn } from './auth/service/guard/auth.guard-fn';
import { authGuardFnLogout } from './auth/service/guard/auth.guard-fn-logout';
import { RegisterPageComponent } from './pages/user-pages/register-page/register-page.component';
import { MyInfoPageComponent } from './pages/user-pages/my-info-page/my-info-page.component';
import { MinigamesPageComponent } from './pages/minigames-page/minigames-page.component';
import { AddProjectPageComponent } from './pages/add-project-page/add-project-page/add-project-page.component';
import { authGuardAdmin } from './auth/service/guard/auth.guard-fn-admin';



export const routes: Routes = [
  {
    path: 'home',
    component: ScrollRevealComponent,
    canActivate: [authGuardFnLogout]
  },
  {
    path: 'user/:id',
    component: ScrollRevealComponent,
    canActivate: [authGuardFn],
  },
  {
    path: 'register',
    component: RegisterPageComponent,
    canActivate: [authGuardFnLogout]
  },
  {
    path: 'projects',
    component: ProjectPageComponent
  },
  {
    path: 'minigames',
    component: MinigamesPageComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'universe',
    component: UniversePagesComponent,
  },
  {
    path: 'update/:id',
    component: MyInfoPageComponent,
    canActivate: [authGuardFn]
  },
  {
    path: 'login',
    component: LogInPageComponent,
    canActivate: [authGuardFnLogout]
  },
  {
    path: 'projects/addProject',
    component: AddProjectPageComponent,
    canActivate: [authGuardAdmin]
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
