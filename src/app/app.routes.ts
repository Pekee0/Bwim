import { Routes } from '@angular/router';
import { LogInPageComponent } from './pages/user-pages/log-in-page/log-in-page.component';
import { ScrollRevealComponent } from './Components/scroll-reveal/scroll-reveal.component';
import { ProjectPageComponent } from './Components/project-components/project-page/project-page.component';
import { UniversePagesComponent } from './pages/universe-pages/universe-pages.component';
import { authGuardFn } from './auth/service/guard/auth.guard-fn';
import { authGuardFnLogout } from './auth/service/guard/auth.guard-fn-logout';
import { RegisterPageComponent } from './pages/user-pages/register-page/register-page.component';
import { MyInfoPageComponent } from './pages/user-pages/my-info-page/my-info-page.component';
import { MinigamesPageComponent } from './pages/minigames-page/minigames-page.component';
import { AddProjectPageComponent } from './pages/add-project-page/add-project-page/add-project-page.component';
import { authGuardAdmin } from './auth/service/guard/auth.guard-fn-admin';
import { UpdateComponentComponent } from './Components/project-components/update-component/update-component.component';
import { ProjectsPagesComponent } from './pages/projects-pages/projects-pages.component';
import { TestPersonalidadComponent } from './Components/mingames-component/test-personalidad/test-personalidad.component';
import { FormPageComponent } from './pages/universe-pages/form-page/form-page.component';
import { DeletePageComponent } from './pages/universe-pages/delete-page/delete-page.component';
import { ContactPageComponent } from './shared/footer/pages/contact-page/contact-page.component';
import { PrivacyPolicyPageComponent } from './shared/footer/pages/privacy-policy-page/privacy-policy-page.component';
import { AboutPageComponent } from './about/pages/about-page/about-page.component';
import { OraculoComponent } from './Components/mingames-component/oraculo/oraculo.component';
import { ShortStoriesComponent } from './Components/short-stories/short-stories.component';
import { SsMenuComponent } from './Components/ss-menu/ss-menu.component';
import { RecuperarPasswordComponent } from './Components/user-components/recuperar-password/recuperar-password.component';
import { VerificarEmailComponent } from './Components/user-components/verificar-email/verificar-email.component';
import { ShortStoriesInstantesComponent } from './Components/short-stories-instantes/short-stories-instantes.component';


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
    component: ProjectsPagesComponent
  },
  {
    path: 'minigames',
    component: MinigamesPageComponent,
    canActivate: [authGuardFn]
  },
  {
    path: 'about',
    component: AboutPageComponent
  },
  {
    path: 'universe',
    component: UniversePagesComponent,
  },
  {
    path: 'universe/add-character',
    component: FormPageComponent,
    canActivate: [authGuardAdmin]
  },
  {
    path: 'universe/delete-character',
    component: DeletePageComponent,
    canActivate: [authGuardAdmin]
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
    path: 'projects/updateProject/:id',
    component: UpdateComponentComponent,
    canActivate: [authGuardAdmin]
  },
  {
    path: 'contact',
    component: ContactPageComponent
  },
  {
    path: 'PrivacyPolicy',
    component: PrivacyPolicyPageComponent
  },
  {
    path: 'minigames/oraculo',
    component: OraculoComponent
  },
  {
    path: 'minigames/test',
    component: TestPersonalidadComponent
  },
  {
    path: 'about',
    component: AboutPageComponent
  },
  {
    path: 'ecos-temporales',
    component: ShortStoriesComponent
  },
  {
    path: 'ssmenu',
    component: SsMenuComponent
  },
  {
    path: 'instantes',
    component: ShortStoriesInstantesComponent
  },
  {
    path:'recuperar-password',
    component:RecuperarPasswordComponent
  },
  {
    path:'verificar-email',
    component:VerificarEmailComponent
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
