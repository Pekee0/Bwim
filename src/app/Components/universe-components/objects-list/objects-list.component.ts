import { Component, inject, OnInit } from '@angular/core';
import { ObjectsService } from '../../../service/objects.service';
import { Object } from '../../../interfaces/object.interface';

@Component({
  selector: 'app-objects-list',
  standalone: true,
  imports: [],
  templateUrl: './objects-list.component.html',
  styleUrl: './objects-list.component.css'
})
export class ObjectsListComponent implements OnInit {
  ngOnInit(): void {
    this.listObjects()
  }

  service = inject(ObjectsService)

  listObjects() {
    this.service.getObject().subscribe(
      {
        next: (objects: Object[]) => this.objects = objects
        ,
        error: (e: Error) => console.log(e.message)
      }
    )
  }

  objects: Object[] = []
}
