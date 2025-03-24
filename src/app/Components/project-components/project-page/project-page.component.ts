import { Component, inject, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Project } from '../../../interfaces/project.interface';
import { ProjectsService } from '../../../service/projects.service';
import { AuthService } from '../../../auth/service/auth.service';
import { RouterLink, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs';
import { User } from '../../../interfaces/user.interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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
      }, error:(e:Error) =>{
        console.log(e.message);
      }
    })

    this.userService.getInfoUser().subscribe({
      next:(user:User[]) =>{
        this.usuarioQueComenta = user;
        this.currentUser = user.find(u=>u.id === (localStorage.getItem('UsuarioActivo')))
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
  currentUser?:User;

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
  fb = inject(FormBuilder);
  userService = inject(UserService);
  authServie = inject(AuthService);
  id:String|null = null;
  comentService = inject(ComentarioService);
  idProyecto: string = '';
  modal = false;
  arrayComment: Comentario[] = [];




form = this.fb.nonNullable.group({
  comment: ['',[Validators.required]]
})

constructor() {

}

async addComment(id: string) {
 if(this.form.invalid) return;

 try {
  const nuevo: Comentario = this.createComment(id);
  const aux: CommentCreate = this.cargarComentarioCreate(nuevo);
  await this.comentService.create(aux);
  this.form.reset();
  this.toastService.success('Comentario agregado exitosamente', '¡Comentario agregado!', { closeButton: true });
 } catch (error) {

 }


}

createComment(id : string) : Comentario
{
  const comment : Comentario = {text: this.form.controls["comment"].value, idUser : this.currentUser?.id! , idStory: id};
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


editando:boolean = false;
aModificar?:string;
textoParaElTextArea?:string;


modificarOpen(id:string,texto:string){
  this.editando = true;
  this.aModificar = id;
  this.textoParaElTextArea = texto;
  this.txareaForm.get('txarea')?.setValue(this.textoParaElTextArea);

}

modificarClose(){
  this.editando = false;
}

txareaForm = this.fb.nonNullable.group({
  txarea:['',[Validators.required]]
})

modificarComentario(){
  if(this.txareaForm.invalid) return;

  const texto:Comentario = this.arrayComment.find(u=>u.id===this.aModificar)!;
  texto.text = this.txareaForm.controls['txarea'].value;
  const aux = this.cargarComentarioCreate(texto);
  this.comentService.update(aux,this.aModificar!);
  this.modificarClose();
}

borrarComentario(id:string){
  this.comentService.delete(id);
}

}

