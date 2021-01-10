import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Data, Position } from "../interfaces";

@Injectable({
	providedIn: 'root'
})
export class PositionsService {
	constructor(private http: HttpClient) { }

	fetch(categoryId: string): Observable<Data> {
		return this.http.get<Data>(`/api/position/${categoryId}`)
	}

	create(position: Position): Observable<Data> {
		return this.http.post<Data>('/api/position', position)
	}

	update(id: string, position: Position): Observable<Data> {
		return this.http.patch<Data>(`/api/position/${id}`, position)
	}

	delete(id: string): Observable<Data> {
		return this.http.delete<Data>(`/api/position/${id}`)
	}
}