import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Admin } from '../../../interfaces/admin.interface';
import { AdminService } from '../../../service/admin.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-admin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-admin.component.html',
  styleUrl: './add-admin.component.css'
})
export class AddAdminComponent {

  @Output()
  emitirAdmin:EventEmitter<Admin> = new EventEmitter();

  fb = inject(FormBuilder);
  adminService= inject(AdminService);

  formulario = this.fb.nonNullable.group(
    {
    name:['',[Validators.required]],
    nickname:['',[Validators.required]],
    surname:['',[Validators.required]],
    email:['',[Validators.required]],
    password:['',[Validators.required]]
    }
  );

  addAdmin(){
    if(this.formulario.invalid)return;
    const admin = this.formulario.getRawValue();
    console.log(admin)
    this.addAdminDB(admin);
    this.emitirAdmin.emit(admin);
  };

  addAdminDB(admin:Admin){
    this.adminService.postAdmin(admin).subscribe({
      next:(admin:Admin)=>{
        console.log(admin);
        alert('Admin guardado...')
      },
      error:(e:Error)=>{
        console.log(e.message);
      }
    });
  }
}
