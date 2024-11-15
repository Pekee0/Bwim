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
import { OraculoComponent } from './Components/mingames-component/oraculo/oraculo.component';
import { TestPersonalidadComponent } from './Components/mingames-component/test-personalidad/test-personalidad.component';
import { FormPageComponent } from './pages/universe-pages/form-page/form-page.component';
import { DeletePageComponent } from './pages/universe-pages/delete-page/delete-page.component';

import { ContactPageComponent } from './shared/footer/pages/contact-page/contact-page.component';
import { PrivacyPolicyPageComponent } from './shared/footer/pages/privacy-policy-page/privacy-policy-page.component';



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
    path: 'universe/add-character',
    component: FormPageComponent,
    //canActivate:[authGuardAdmin]
  },
  {
    path: 'universe/delete-character',
    component: DeletePageComponent
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
     path:'contact',
    component:ContactPageComponent
  },
  {
    path:'PrivacyPolicy',
    component:PrivacyPolicyPageComponent
  },
  {
    path:'minigames/oraculo',
    component:OraculoComponent
  },
  {
    path:'minigames/test',
   component:TestPersonalidadComponent
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch:'full'
  }
];
