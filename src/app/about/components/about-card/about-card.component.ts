import { Component, Input } from '@angular/core';
import { Developer } from '../../interface/developer.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-card.component.html',
  styleUrl: './about-card.component.css'
})
export class AboutCardComponent {
  @Input()
  dev!: Developer

  indexImg: number = 0

  cambiarIndexImg() {
    if(this.indexImg == 0) {
      this.indexImg = 1
    } else {
      this.indexImg = 0
    }
  }

  cambioImg() {
    if(this.indexImg == 0) {
      setInterval(() => {
        this.cambiarIndexImg()
      },25000)
    } else {
      setInterval(() => {
        this.cambiarIndexImg()
      },10000)
    }
  }

  d:any = this.cambioImg()
}
