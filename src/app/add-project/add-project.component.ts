import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectsService } from '../service/projects.service';


@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css'
})
export class AddProjectComponent implements OnInit, OnDestroy {

  renderer = inject(Renderer2);
  fb = inject(FormBuilder);
  projectService = inject(ProjectsService);

  formulario = this.fb.nonNullable.group(
    {
      name: ['', Validators.required],
      description: ['', Validators.required],
      urlProject: ['', Validators.required],
      images: ['', Validators.required]
    }
  )

  ngOnInit(): void {

    this.renderer.addClass(document.body, 'body-blur');
  }

  ngOnDestroy(): void {

    this.renderer.removeClass(document.body, 'body-blur');
  }

}
