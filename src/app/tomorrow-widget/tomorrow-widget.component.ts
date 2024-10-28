import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';

declare const window: any; // Añade esta línea para que TypeScript trate `window` como `any`

@Component({
  selector: 'app-tomorrow-widget',
  templateUrl: './tomorrow-widget.component.html',
  styleUrls: ['./tomorrow-widget.component.css'],
  standalone: true
})
export class TomorrowWidgetComponent implements OnInit {
  private scriptId = 'tomorrow-sdk';

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    // Verificar si el script ya existe
    if (!document.getElementById(this.scriptId)) {
      const script = this.renderer.createElement('script');
      script.id = this.scriptId;
      script.src = 'https://www.tomorrow.io/v1/widget/sdk/sdk.bundle.min.js';
      script.onload = () => this.renderWidget();
      this.renderer.appendChild(document.body, script);
    } else if (window.__TOMORROW__) {
      this.renderWidget();
    }
  }

  private renderWidget() {
    if (window.__TOMORROW__) {
      window.__TOMORROW__.renderWidget();
    }
  }
}
