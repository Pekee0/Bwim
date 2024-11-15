import { Component } from '@angular/core';
import { ProjectPageComponent } from "../../Components/project-components/project-page/project-page.component";

@Component({
  selector: 'app-projects-pages',
  standalone: true,
  imports: [ProjectPageComponent],
  templateUrl: './projects-pages.component.html',
  styleUrl: './projects-pages.component.css'
})
export class ProjectsPagesComponent {

}
