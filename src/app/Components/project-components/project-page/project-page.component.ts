import { Component, inject, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Project } from '../../../interfaces/project.interface';
import { ProjectsService } from '../../../service/projects.service';
import { AuthService } from '../../../auth/service/auth.service';
import { RouterLink, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs';
import { User } from '../../../interfaces/user.interface';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../service/user.service';
import { ComentarioService, CommentCreate } from '../../../service/comentario.service';
import { Comentario } from '../../../interfaces/comentario.interface';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-project-page',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,CommonModule],
  templateUrl: './project-page.component.html',
  styleUrl: './project-page.component.css'
})
export class ProjectPageComponent implements OnInit {


  ngOnInit(): void {

    this.projectList();
    if (localStorage.getItem('tokenAdmin')) {
      this.authService.isAdmin = true;
    }

    this.comentService.getComments().subscribe({
      next:(comentario:Comentario[]) =>{
        this.arrayComment = comentario;
        console.log(this.arrayComment);
        
      }, error:(e:Error) =>{
        console.log(e.message);
      }
    })

    this.userService.getInfoUser().subscribe({
      next:(user:User[]) =>{
        this.usuarioQueComenta = user;
      },error:(e:Error) =>{
        console.log(e.message);
      }
    })
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
  usuarioQueComenta?: User[] = []; 
  
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


  // Cosas de los comentarios
  userActive?: User; 
  fb = inject(FormBuilder); 
  userService = inject(UserService); 
  authServie = inject(AuthService); 
  id:String|null = null; 
  idUser = localStorage.getItem('UsuarioActivo');
  comentService = inject(ComentarioService);
  idProyecto: string = '';   
  modal = false; 
  arrayComment: Comentario[] = [];  


  
  
form = this.fb.nonNullable.group({
  comment: ['']
})

constructor() {

}

async addComment(id: string) {
 if(this.form.invalid) return; 

 try {
  const nuevo: Comentario = this.createComment(id);
  const aux: CommentCreate = this.cargarComentarioCreate(nuevo);
  await this.comentService.create(aux); 
  //this.isModalClose(); 
  this.form.reset();
  this.toastService.success('Comentario agregado exitosamente', '¡Comentario agregado!', { closeButton: true });
 } catch (error) {
  
 }


}

createComment(id : string) : Comentario
{
 
  const comment : Comentario = {text: this.form.controls["comment"].value, idUser : this.idUser! , idStory: id};

  return comment; 
}

cargarComentarioCreate(comentario: Comentario) : CommentCreate
{

  const commentCreate: CommentCreate = {text: comentario.text, idUser: comentario.idUser, idStory: comentario.idStory};

  return commentCreate;
}

isModalOpen()
{
    this.modal = true; 
}

isModalClose()
{
  this.modal = false;
}


getUserxComment(idArrival:String)
{ 
 
  const nickname = this.usuarioQueComenta?.find(u => u.id === idArrival)
  return (nickname?.nickname); 

  
}

getImgUserxComment(idArrival:String)
{ 
 
  const imgP = this.usuarioQueComenta?.find(u => u.id === idArrival)
  return (imgP?.imgPerfil); 
}


}

// '<iframe frameborder="0" src="https://itch.io/embed/2393332?border_width=5&amp;bg_color=f1f1f1&amp;fg_color=439BDB&amp;link_color=D49319&amp;border_color=d44c16" width="560" height="175"><a href="https://ibm-entretainmient.itch.io/gotofuturepast">goto( future , past ) ; by IBM Entretainmient</a></iframe>'


