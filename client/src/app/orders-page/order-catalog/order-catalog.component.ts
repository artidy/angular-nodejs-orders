import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs';
import { Data } from 'src/app/shared/interfaces'
import { CatalogService } from 'src/app/shared/services/catalog-service'

@Component({
  selector: 'app-order-catalog',
  templateUrl: './order-catalog.component.html',
  styleUrls: ['./order-catalog.component.css']
})
export class OrderCatalogComponent implements OnInit {

  catalog$: Observable<Data>

  constructor(private catalogService: CatalogService) { }

  ngOnInit(): void {
    this.catalog$ = this.catalogService.fetch()
  }

}
