import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectsService } from '../../../service/projects.service';
import { ToastrService } from 'ngx-toastr';
import { Project } from '../../../interfaces/project.interface';


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
  toastService = inject(ToastrService);

  formulario = this.fb.nonNullable.group(
    {
      id: '',
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

  private projectIdCounter = 1;

  addProject() {

    if (this.formulario.invalid) {
      this.toastService.error("Ingrese todos los campos correspondientes", "Error", { closeButton: true });
      return;
    }

    const project = this.formulario.getRawValue();
    this.addProjectDB(project);

  }

  addProjectDB(project: Project) {

    this.projectService.postProject(project).subscribe(
      {
        next: (project: Project) => {
          this.toastService.success("¡Proyecto añadido exitosamente!", ' ', { closeButton: true });
        },
        error: (e: Error) => {
          console.log(e.message);

        }
      }
    )
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

// "id": "321",
// "name": "realloc( timeline ) ;",
// "description": "realloc es la secuela del aclamado 'goto'. Aquí, seguimos la historia de Damián en la línea temporal principal de la saga. Acompañalo en la busqueda del asesino de Gabriel. Pero no te confíes, nada acá es lo que parece",
// "urlProject": "<iframe frameborder=\"0\" src=\"https://itch.io/embed/2393332?border_width=5&amp;bg_color=f1f1f1&amp;fg_color=439BDB&amp;link_color=D49319&amp;border_color=d44c16\" width=\"600\" height=\"175\"><a href=\"https://ibm-entretainmient.itch.io/gotofuturepast\">goto( future , past ) ; by IBM Entretainmient</a></iframe>",
// "images": "assets/FondoOficinaResized.png"

