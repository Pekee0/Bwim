import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PyR } from '../../../interfaces/pYr.interface';

@Component({
  selector: 'app-oraculo',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './oraculo.component.html',
  styleUrl: './oraculo.component.css'
})
export class OraculoComponent {

  oraculo: string[] = [
    'Sí','Probablemente','No sé','Probablemente no','No','El futuro no es claro',
    'No me corresponde decirlo','Como te ven te tratan...'
  ]

  pregunta: string = ''

  pYrs:PyR[] = [] 

  pensamiento: string[] = [
    'Consultando las líneas del tiempo...',
    'Viendo tu futuro...',
    'Pensando...',
    ' . . . ',
    'Tirando las cartas...'
  ]

  recibirPregunta() {
    this.pYrs.push({
      pregunta: this.pregunta,
      respuesta: this.darRespuesta(this.pensamiento,this.pensamiento.length)
    })
    setTimeout(() => {
      this.pYrs[this.pYrs.length-1].respuesta = this.darRespuesta(this.oraculo,this.oraculo.length)
    },3000)
  } 

  darRespuesta(arreglo: string[], cantidad: number) {
    const i = Math.floor(Math.random() * cantidad)
    return arreglo[i]
  }
}
