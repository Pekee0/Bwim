import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-transition',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transition.component.html',
  styleUrl: './transition.component.css'
})
export class TransitionComponent {

  @Input() isVisible = false;
  audioSrc = 'path/to/your-audio.mp3';

  // Método que se ejecuta cuando el audio termina
  onAudioEnded() {
    this.isVisible = false;
  }

}
