import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialService } from '../shared/classes/material-service';
import { MaterialInstance } from '../shared/interfaces';
import { OrderService } from '../shared/services/order-service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css']
})
export class OrdersPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('modal') modalRef: ElementRef
  oSub: Subscription
  modal: MaterialInstance
  isRoot: boolean
  loading = false

  constructor(private router: Router,
              public orderService: OrderService) { }

  ngOnInit(): void {
    this.isRoot = this.router.url === '/orders'
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/orders'
      }  
    })
  }

  ngOnDestroy() {
    this.modal.destroy()
    if (this.oSub) {
      this.oSub.unsubscribe()
    }
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  openModal() {
    this.modal.open()
  }

  closeModal() {
    this.modal.close()
  }

  onSubmit() {
    this.loading = true
    this.orderService.create()
      .subscribe(
        res => {
          MaterialService.toast(res.message)
          this.orderService.clear()
          this.modal.close()
        },
        error => MaterialService.toast(error.error.message),
        () => this.loading = false
      )
  }
}
