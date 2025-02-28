import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verificar-email',
  standalone: true,
  imports: [],
  templateUrl: './verificar-email.component.html',
  styleUrl: './verificar-email.component.css'
})
export class VerificarEmailComponent {
  private router = inject(Router)

  submit(){
    this.router.navigateByUrl('/login');
  }
}
