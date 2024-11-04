import { Component } from '@angular/core';
import { CardComponent } from '../character/card/card.component';

@Component({
  selector: 'app-universe-pages',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './universe-pages.component.html',
  styleUrl: './universe-pages.component.css'
})
export class UniversePagesComponent {

}
