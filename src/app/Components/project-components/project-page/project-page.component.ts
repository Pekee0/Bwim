import { Component, inject, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Project } from '../../../interfaces/project.interface';
import { ProjectsService } from '../../../service/projects.service';
import { AuthService } from '../../../auth/service/auth.service';
<<<<<<< HEAD
import { RouterLink, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs';
=======
import { RouterLink } from '@angular/router';

>>>>>>> 2408e09a2218af69fbcb95c01f491e8d9d7d8be1
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

<<<<<<< HEAD
  toastService = inject(ToastrService);
=======

>>>>>>> 2408e09a2218af69fbcb95c01f491e8d9d7d8be1
  authService = inject(AuthService);
  renderer = inject(Renderer2);
  sanitizer = inject(DomSanitizer);
  projectService = inject(ProjectsService);
  arrProject: Project[] = []
  iframeString: string = '';
  safeIframe: SafeHtml = '';
<<<<<<< HEAD
  router = inject(Router);
=======
>>>>>>> 2408e09a2218af69fbcb95c01f491e8d9d7d8be1

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

<<<<<<< HEAD
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

=======
>>>>>>> 2408e09a2218af69fbcb95c01f491e8d9d7d8be1


}

// '<iframe frameborder="0" src="https://itch.io/embed/2393332?border_width=5&amp;bg_color=f1f1f1&amp;fg_color=439BDB&amp;link_color=D49319&amp;border_color=d44c16" width="560" height="175"><a href="https://ibm-entretainmient.itch.io/gotofuturepast">goto( future , past ) ; by IBM Entretainmient</a></iframe>'


