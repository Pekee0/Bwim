import { Component, OnInit, inject } from "@angular/core";
import { Admin } from "../../../interfaces/admin.interface";
import { AdminService } from "../../../service/admin.service";
import { AddAdminComponent } from "../add-admin/add-admin.component";

@Component({
  selector: 'app-list-admin',
  standalone: true,
  imports: [AddAdminComponent],
  templateUrl: './list-admin.component.html',
  styleUrl: './list-admin.component.css'
})

export class ListAdminComponent implements OnInit{
  ngOnInit(): void {
    this.listAdmins();
  }

  adminList:Admin[] = [];

  adminService = inject(AdminService);

  addAdmin(admin:Admin){
    this.adminList.push({...admin})
  }

  listAdmins(){
    this.adminService.getAdmin().subscribe(
      {
        next:(admin:Admin[])=>{
          this.adminList = admin
        },
        error:(e:Error)=>{
          console.log(e.message);
        }
      }
    )
  }
}
