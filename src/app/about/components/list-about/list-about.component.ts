import { Component } from '@angular/core';
import { Developer } from '../../interfaces/developers.interface';
import { CommonModule } from '@angular/common';
import { AboutCardComponent } from '../about-card/about-card.component';

@Component({
  selector: 'app-list-about',
  standalone: true,
  imports: [CommonModule,AboutCardComponent],
  templateUrl: './list-about.component.html',
  styleUrl: './list-about.component.css'
})
export class ListAboutComponent {
  devs: Developer[] = [
    {
      img: 'assets/images/cosmar.jpg',
      nombre: 'Marcos Bianchi',
      apodo: '"The Boss"',
      trabajos_participados:['goto(future,past)','Realloc','BWIM'],
      descripcion: 'we were on a break'
    },
    {
      img: 'assets/images/ivi.jpg',
      nombre: 'Ivan Ialonardi',
      apodo: '"The Developer"',
      trabajos_participados:['goto(future,past)','Realloc','BWIM'],
      descripcion: 'light weight baby'
    },
    {
      img: 'assets/images/grande.png',
      nombre: 'Gonzalo Marsala',
      apodo: '"The Goat"',
      trabajos_participados:['goto(future,past)','Realloc','BWIM'],
      descripcion: 'bee bee'
    },
    {
      img: 'assets/images/kuka.jpg',
      nombre: 'Pablo Walter',
      apodo: '"The L. Enjoyer"',
      trabajos_participados:['Realloc','BWIM'],
      descripcion: 'soy un dragoncito violeta'
    },
    {
      img: 'assets/images/nico.jpg',
      nombre: 'Nicolas Ruiz',
      apodo: '"The Wizard"',
      trabajos_participados:['BWIM'],
      descripcion: 'a big power conlleva a big responsabilidad'
    },
    {
      img: 'assets/card creadores/ejemplo.png',
      nombre: 'Lautaro Roldan',
      apodo: '"The MDF Fat"',
      trabajos_participados:['goto(future,past)','BWIM'],
      descripcion: 'ping ping ping ping pinggggg'
    }
  ];
}
