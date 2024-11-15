import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectsService } from '../../../service/projects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Project } from '../../../interfaces/project.interface';

@Component({
  selector: 'app-update-component',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-component.component.html',
  styleUrl: './update-component.component.css'
})
export class UpdateComponentComponent implements OnInit {


  id: string | null = null;
  fb = inject(FormBuilder);
  projectService = inject(ProjectsService);
  activatedRoute = inject(ActivatedRoute);
  toastService = inject(ToastrService);
  router = inject(Router);
  project?: Project;

  formulario = this.fb.nonNullable.group(
    {
      name: ['', Validators.required],
      description: ['', Validators.required],
      urlProject: ['', Validators.required],
      images: ['', Validators.required]
    }
  )

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(
      {
        next: (param) => {
          this.id = param.get('id')
        },
        error: (e: Error) => {
          console.log(e.message);
        }
      }
    )
    this.getProjectById(this.id);

  }

  getProjectById(id: string | null) {

    this.projectService.getProject_ById(id).subscribe(
      {
        next: (project: Project) => {
          this.formulario.controls['name'].setValue(project.name),
            this.formulario.controls['description'].setValue(project.description),
            this.formulario.controls['urlProject'].setValue(project.urlProject.toString())
        },
        error: (e: Error) => {
          console.log(e.message);

        }
      }
    )
  }

  updateProject() {

    if (this.formulario.invalid) {
      this.toastService.error("Ingrese todos los campos correspondientes", "Error", { closeButton: true });
      return;
    }
    const project = this.loadProject()
    this.projectService.putProject(project, this.id).subscribe(
      {
        next: () => {
          this.toastService.success('La página se recargara automaticamente', "¡Proyecto añadido exitosamente!", { closeButton: true });
          setTimeout(() => {
            this.router.navigateByUrl('projects');
          }, 3000);
        },
        error: (e: Error) => {
          console.log(e.message);

        }
      }
    )


  }


  loadProject(): Project {

    const project: Project = {
      name: this.formulario.controls['name'].value,
      description: this.formulario.controls['description'].value,
      urlProject: this.formulario.controls['urlProject'].value,
      images: this.formulario.controls['images'].value
    }

    return project
  }

  imgUrl: string | ArrayBuffer | null | undefined = null;
  onImageChange(event: any) {
    const file = event.target.files[0]; // Se obtiene el archivo seleccionado.

    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imgUrl = reader.result as string; // Almacena la URL de la imagen en base64
          console.log(this.imgUrl);

          // Actualiza el control 'images' en el formulario con el valor en base64
          this.formulario.get('images')?.setValue(this.imgUrl);
        };
        reader.readAsDataURL(file); // Lee el archivo como una URL en base64;
      } else {
        alert('Por favor, sube un archivo de imagen válido.');
        this.formulario.get('images')?.setValue('null');
      }
    }
  }

}
