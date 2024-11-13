import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ListAboutComponent } from '../../components/list-about/list-about.component';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [ListAboutComponent],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css'
})
export class AboutPageComponent {

}
