import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-short-stories',
  templateUrl: './short-stories.component.html',
  styleUrls: ['./short-stories.component.css']
})
export class ShortStoriesComponent implements OnInit {
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