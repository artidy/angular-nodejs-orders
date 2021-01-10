import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import Chart from 'chart.js'
import { MaterialService } from '../shared/classes/material-service';
import { AnalyticsService } from '../shared/services/analytics-service';

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.css']
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('gain') gainRef: ElementRef
  @ViewChild('order') orderRef: ElementRef
  aSub: Subscription
  average: number
  pending = true

  constructor(private analyticsService: AnalyticsService) { }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  ngAfterViewInit() {
    const gainConfig: any = {
      label: 'Выручка',
      color: 'rgb(255, 99, 32)'
    }
    const orderConfig: any = {
      label: 'Заказы',
      color: 'rgb(115, 34, 11)'
    }
    this.aSub = this.analyticsService.getAnalytics()
      .subscribe(
        res => {
          this.average = res.data.average
          gainConfig.labels = res.data.chart.map(item => item.label)
          gainConfig.data = res.data.chart.map(item => item.gain)
          orderConfig.labels = res.data.chart.map(item => item.label)
          orderConfig.data = res.data.chart.map(item => item.order)

          const gainCtx = this.gainRef.nativeElement.getContext('2d')
          gainCtx.canvas.height = '300px'
          const orderCtx = this.orderRef.nativeElement.getContext('2d')
          orderCtx.canvas.height = '300px'
          
          new Chart(gainCtx, createChartConfig(gainConfig))
          new Chart(orderCtx, createChartConfig(orderConfig))
        },
        error => MaterialService.toast(error.error.message),
        () => this.pending = false
      )
  }

}

function createChartConfig({labels, data, label, color}) {
  return {
    type: 'line',
    options: {
      responsive: true
    },
    data: {
      labels,
      datasets: [
        {
          label,
          data,
          borderColor: color,
          steppedLine: false,
          fill: false
        }
      ]
    }
  }
}