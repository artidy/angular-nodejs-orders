import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, OnDestroy, Output, ViewChild } from '@angular/core';
import { MaterialService } from 'src/app/shared/classes/material-service';
import { Filter, MaterialDatePicker } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.css']
})
export class HistoryFilterComponent implements OnInit, OnDestroy, AfterViewInit {

  @Output() onFilter = new EventEmitter<Filter>()
  @ViewChild('start') startRef: ElementRef
  @ViewChild('end') endRef: ElementRef
  start: MaterialDatePicker
  end: MaterialDatePicker
  order: number
  isValid = true

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.start.destroy()
    this.end.destroy()
  }

  ngAfterViewInit() {
    this.start = MaterialService.initDatePicker(this.startRef, this.validate.bind(this))
    this.end = MaterialService.initDatePicker(this.endRef, this.validate.bind(this))
  }

  validate() {
    this.isValid = true
    if(this.start.date && this.end.date && this.start.date > this.end.date) {
      this.isValid = false
    }
  }

  submitFilter() {
    const filter: Filter = {}

    if (this.order) {
      filter.order = this.order
    }

    if (this.start.date) {
      filter.start = this.start.date
    }

    if (this.end.date) {
      filter.end = this.end.date
    }

    this.onFilter.emit(filter)
  }

}
