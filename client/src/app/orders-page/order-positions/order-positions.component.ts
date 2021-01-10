import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { PositionsService } from 'src/app/shared/services/positions-service';
import { Data, Position } from 'src/app/shared/interfaces';
import { map, switchMap } from 'rxjs/operators';
import { OrderService } from 'src/app/shared/services/order-service';
import { MaterialService } from 'src/app/shared/classes/material-service';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.css']
})
export class OrderPositionsComponent implements OnInit {

  positions$: Observable<Data>

  constructor(private route: ActivatedRoute,
              private positionsService: PositionsService,
              private orderService: OrderService) { }

  ngOnInit(): void {
    this.positions$ = this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.positionsService.fetch(params.id)
        }),
        map(
          (positions) => { 
            positions.data = positions.data.map((position: Position) => {
              position.quantity = 1
              return position
            })
            return positions
          }
        )
      )
  }

  addPosition(position: Position) {
    this.orderService.add(position)
    MaterialService.toast(`Добавлено ${position.name} x${position.quantity}`)
  }
}
