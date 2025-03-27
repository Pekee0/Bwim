import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-short-stories-instantes',
  standalone: true,
  imports: [],
  templateUrl: './short-stories-instantes.component.html',
  styleUrl: './short-stories-instantes.component.css'
})
export class ShortStoriesInstantesComponent implements OnInit {
  scrollProgress = 0;

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    this.scrollProgress = (scrollTop / scrollHeight) * 100;
  }

  ngOnInit(): void {
    this.onWindowScroll();
  }
}
