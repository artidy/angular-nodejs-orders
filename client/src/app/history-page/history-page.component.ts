import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MaterialService } from '../shared/classes/material-service';
import { Filter, MaterialInstance } from '../shared/interfaces';
import { OrderService } from '../shared/services/order-service';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('tooltip') tooltipRef: ElementRef
  oSub: Subscription
  tooltip: MaterialInstance
  isFilterVisible = false
  loading = false
  orders = []
  offset = 0
  limit = 2
  noMoreOrders = false
  filter: Filter = {}

  constructor(private ordersService: OrderService) { }

  ngOnInit(): void {
    this.fetch()
  }

  private fetch() {
    this.loading = true
    const params = Object.assign({}, this.filter, {
      offset: this.offset,
      limit: this.limit
    })
    this.oSub = this.ordersService.fetch(params)
      .subscribe(
        res => {
          this.noMoreOrders = res.data.length < this.limit
          this.orders = this.orders.concat(res.data)
        },
        error => MaterialService.toast(error.error.message),
        () => this.loading = false
      )
  }

  ngOnDestroy() {
    this.tooltip.destroy()
    if (this.oSub) {
      this.oSub.unsubscribe()
    }
  }

  ngAfterViewInit() {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef)
  }

  clearAllOrders() {
    this.ordersService.deleteAllOrders()
      .subscribe(
        res => {
          MaterialService.toast(res.message)  
        },
        error => MaterialService.toast(error.error.message)
      )
  }

  loadMore() {
    this.offset += 2;
    this.fetch()
  }

  applyFilter(filter: Filter) {
    this.offset = 0
    this.orders = []
    this.filter = filter
    this.fetch()
  }

  isFiltered(): boolean {
    return Object.keys(this.filter).length !== 0
  }

}
