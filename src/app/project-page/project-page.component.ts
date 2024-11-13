import { Component, inject, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Project } from '../interfaces/project.interface';
import { ProjectsService } from '../service/projects.service';

@Component({
  selector: 'app-project-page',
  standalone: true,
  imports: [],
  templateUrl: './project-page.component.html',
  styleUrl: './project-page.component.css'
})
export class ProjectPageComponent implements OnInit {


  ngOnInit(): void {

    this.projectList();
  }



  renderer = inject(Renderer2);
  sanitizer = inject(DomSanitizer);
  projectService = inject(ProjectsService);
  arrProject: Project[] = []
  iframeString: string = '';
  safeIframe: SafeHtml = '';

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

}

// '<iframe frameborder="0" src="https://itch.io/embed/2393332?border_width=5&amp;bg_color=f1f1f1&amp;fg_color=439BDB&amp;link_color=D49319&amp;border_color=d44c16" width="560" height="175"><a href="https://ibm-entretainmient.itch.io/gotofuturepast">goto( future , past ) ; by IBM Entretainmient</a></iframe>'


