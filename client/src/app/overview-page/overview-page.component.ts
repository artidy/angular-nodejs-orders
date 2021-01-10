import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MaterialService } from '../shared/classes/material-service';
import { Data, MaterialInstance } from '../shared/interfaces';
import { AnalyticsService } from '../shared/services/analytics-service';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.css']
})
export class OverviewPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('tapTarget') tapTargetRef: ElementRef
  data$: Observable<Data>
  tapTarget: MaterialInstance


  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit(): void { 
    this.data$ = this.analyticsService.getOverview()
  }

  ngOnDestroy() {
    this.tapTarget.destroy()
  }

  ngAfterViewInit() {
    this.tapTarget = MaterialService.initTabTarget(this.tapTargetRef)
  }

  openInfo() {
    this.tapTarget.open()  
  }

}
