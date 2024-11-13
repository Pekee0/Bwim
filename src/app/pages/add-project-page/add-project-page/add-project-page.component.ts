import { Component } from '@angular/core';
import { AddProjectComponent } from "../../../add-project/add-project.component";

@Component({
  selector: 'app-add-project-page',
  standalone: true,
  imports: [AddProjectComponent],
  templateUrl: './add-project-page.component.html',
  styleUrl: './add-project-page.component.css'
})
export class AddProjectPageComponent {

}
