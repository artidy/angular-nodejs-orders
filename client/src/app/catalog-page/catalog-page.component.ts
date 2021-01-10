import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../shared/services/catalog-service';
import { Data } from '../shared/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.css']
})
export class CatalogPageComponent implements OnInit {

  catalog$: Observable<Data>;

  constructor(private catalogService: CatalogService) { }

  ngOnInit(): void {
    this.catalog$ = this.catalogService.fetch();
  };
};
