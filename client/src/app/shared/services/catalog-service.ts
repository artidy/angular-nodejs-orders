import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { Category, Data } from "../interfaces"

@Injectable({
	providedIn: 'root'	
})
export class CatalogService {
	constructor(private http: HttpClient) { }

	fetch(): Observable<Data> {
		return this.http.get<Data>('/api/category')
	}

	getById(id: string): Observable<{message: string, data}> {
		return this.http.get<{message: string, data}>(`/api/category/${id}`)
	}

	create(name: string, image?: File): Observable<{message: string, data: Category}> {
		const formData = new FormData()
		if (image) {
			formData.append('image', image, image.name)	
		}
		formData.append('name', name)
		return this.http.post<{message: string, data: Category}>('/api/category', formData)
	}

	update(id: string, name: string, image?: File): Observable<{message: string, data: Category}> {
		const formData = new FormData()
		if (image) {
			formData.append('image', image, image.name)	
		}
		formData.append('name', name)
		return this.http.patch<{message: string, data: Category}>(`/api/category/${id}`, formData)
	}

	delete(id: string): Observable<Data> {
		return this.http.delete<Data>(`/api/category/${id}`)
	}
}