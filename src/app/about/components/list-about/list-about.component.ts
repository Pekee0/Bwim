import { CommonModule } from '@angular/common';
import { Developer } from './../../interface/developer.interface';
import { Component } from '@angular/core';
import { AboutCardComponent } from '../about-card/about-card.component';

@Component({
  selector: 'app-list-about',
  standalone: true,
  imports: [CommonModule,AboutCardComponent],
  templateUrl: './list-about.component.html',
  styleUrl: './list-about.component.css'
})
export class ListAboutComponent {

  devs1: Developer[] = [
    {
      img: ['assets/images/developers-imgs/MarcosCredencial.png','assets/images/developers-imgs/cosmar.jpg'],
      nombre: 'Marcos Bianchi',
      apodo: '"The Boss"',
      trabajos_participados:['goto(future,past)','Realloc','BWIM'],
      descripcion: 'PARKOUR!!',
      link_github: 'https://github.com/MarcoosB',
      link_linkedin: 'https://www.linkedin.com/in/marcos-bianchi-81bb45220/'
    },
    {
      img: ['assets/images/developers-imgs/IvanCredencial.png','assets/images/developers-imgs/ivi.jpg'],
      nombre: 'Ivan Ialonardi',
      apodo: '"The Admin"',
      trabajos_participados:['goto(future,past)','Realloc','BWIM'],
      descripcion: 'Light weight baby',
      link_github: 'https://github.com/ivi-developer',
      link_linkedin: 'https://www.linkedin.com/in/ivan-ialonardi-b58491187/'
    },
    {
      img: ['assets/images/developers-imgs/PekeCredencial.png','assets/images/developers-imgs/grande.png'],
      nombre: 'Gonzalo Marsala',
      apodo: '"The GOAT"',
      trabajos_participados:['goto(future,past)','Realloc','BWIM'],
      descripcion: 'W A S D',
      link_github: 'https://github.com/Pekee0',
      link_linkedin: 'https://www.linkedin.com/in/gonza-marsala-2a1463233/'
    }
  ]
devs2: Developer[] = [
    {
      img: ['assets/images/developers-imgs/PabloCredencial.png','assets/images/developers-imgs/kuka.jpg'],
      nombre: 'Pablo Walter',
      apodo: '"The L. Enjoyer"',
      trabajos_participados:['Realloc','BWIM'],
      descripcion: 'Soy un dragoncito violeta',
      link_github: 'https://github.com/pablowalter11',
      link_linkedin: 'https://www.linkedin.com/in/pablo-walter-quiroga-89b53324b/'
    },
    {
      img: ['assets/images/developers-imgs/NicoCredencial.png','assets/images/developers-imgs/nico.jpg'],
      nombre: 'Nicolas Ruiz',
      apodo: '"The Wizard"',
      trabajos_participados:['BWIM'],
      descripcion: 'A big power conlleva a big responsabilidad',
      link_github: 'https://github.com/NiccoRz',
      link_linkedin: 'https://www.linkedin.com/in/nicolasruiz26/'
    }
  ]
}