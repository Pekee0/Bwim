import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Developer } from '../../interfaces/developers.interface';

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
}
