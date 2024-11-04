import { Component, OnInit, Renderer2, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-weather-widget-f',
  templateUrl: './weather-widget-f.component.html',
  styleUrls: ['./weather-widget-f.component.css'],
  standalone: true
})
export class WeatherWidgetFComponent implements OnInit, AfterViewInit {
  private scriptLoaded = false;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.loadWeatherWidgetScript();
  }

  ngAfterViewInit(): void {
    // Inicializa el widget después de cargar el script y cuando el HTML está listo
    if (this.scriptLoaded) {
      this.initializeWidget();
    }
  }

  loadWeatherWidgetScript() {
    const scriptId = 'weatherwidget-io-js';

    // Verifica si el script ya está cargado
    if (!document.getElementById(scriptId)) {
      const script = this.renderer.createElement('script');
      script.id = scriptId;
      script.src = 'https://weatherwidget.io/js/widget.min.js';
      script.onload = () => {
        this.scriptLoaded = true;
        this.initializeWidget();
      };
      this.renderer.appendChild(document.body, script);
    } else {
      this.scriptLoaded = true;
      this.initializeWidget();
    }
  }

  initializeWidget() {
    // Asegúrate de que el script de weatherwidget esté disponible en el ámbito global
    if ((window as any).weatherwidget) {
      (window as any).weatherwidget.io.refresh();
    }
  }
}
