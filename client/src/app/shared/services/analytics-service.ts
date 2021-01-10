import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Data } from "../interfaces";

@Injectable({
	providedIn: 'root'
})
export class AnalyticsService {
	constructor(private http: HttpClient) {}

	getOverview(): Observable<Data> {
		return this.http.get<Data>('/api/analytics/overview')
	}

	getAnalytics(): Observable<Data> {
		return this.http.get<Data>('/api/analytics/analytics')
	}
}