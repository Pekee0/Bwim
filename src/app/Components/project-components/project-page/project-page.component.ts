import { Component, inject, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Project } from '../../../interfaces/project.interface';
import { ProjectsService } from '../../../service/projects.service';
import { AuthService } from '../../../auth/service/auth.service';
import { RouterLink, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs';
@Component({
  selector: 'app-project-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './project-page.component.html',
  styleUrl: './project-page.component.css'
})
export class ProjectPageComponent implements OnInit {


  ngOnInit(): void {

    this.projectList();
    if (localStorage.getItem('tokenAdmin')) {
      this.authService.isAdmin = true;
    }
  }

  toastService = inject(ToastrService);
  authService = inject(AuthService);
  renderer = inject(Renderer2);
  sanitizer = inject(DomSanitizer);
  projectService = inject(ProjectsService);
  arrProject: Project[] = []
  iframeString: string = '';
  safeIframe: SafeHtml = '';
  router = inject(Router);

  projectList() {

    this.projectService.getProject().subscribe(
      {
        next: (projects: Project[]) => {

          this.arrProject = projects
        },
        error: (e: Error) => {
          e.message
        }
      }
    )
  }

  safeURL(url: string) {

    // this.iframeString =  url;
    this.safeIframe = this.sanitizer.bypassSecurityTrustHtml(url);

    return this.safeIframe;
  }

  delete(id: string) {
    this.projectService.deleteProject(id).subscribe(
      {
        next: () => {

          this.toastService.success('La página se recargara automaticamente', "¡Proyecto eliminado exitosamente!", { closeButton: true });
          setTimeout(() => {
            window.location.reload()
          }, 3000);
        },
        error: (e: Error) => {

          console.log(e.message);

        }
      }
    )

  }

  navigateToUpdate(id: string) {

    this.router.navigate([`projects/updateProject/${id}`])
  }



}

// '<iframe frameborder="0" src="https://itch.io/embed/2393332?border_width=5&amp;bg_color=f1f1f1&amp;fg_color=439BDB&amp;link_color=D49319&amp;border_color=d44c16" width="560" height="175"><a href="https://ibm-entretainmient.itch.io/gotofuturepast">goto( future , past ) ; by IBM Entretainmient</a></iframe>'


