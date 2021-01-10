import { HttpClient, HttpParams } from "@angular/common/http";
import { OrderPosition, Position, Data } from '../interfaces';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class OrderService {
	
	public positions: OrderPosition[] = []
	public price: number = 0

	constructor(private http: HttpClient) { }

	fetch(params: any = {}): Observable<Data> {
		return this.http.get<Data>('/api/order', {
			// класс позволяет работать с гет параметрами
			params: new HttpParams({
				fromObject: params
			}) 
		})	
	} 

	create(): Observable<Data> {
		return this.http.post<Data>('/api/order', {list: this.positions})
	}

	deleteAllOrders(): Observable<Data> {
		return this.http.delete<Data>('/api/order')	
	}

	add(position: Position) {
		let orderPosition = this.positions.find(item => item._id === position._id)
		if (orderPosition) {
			orderPosition.quantity += position.quantity		
		}
		else {
			orderPosition = Object.assign({}, {
				name: position.name,
				cost: position.cost,
				quantity: position.quantity,
				_id: position._id
			})
			this.positions.push(orderPosition)
		}
		this.computePrice()
	}

	remove(position: OrderPosition) {
		const idx = this.positions.findIndex(item => item._id === position._id) 
		this.positions.splice(idx, 1)
		this.computePrice()
	}

	clear() {
		this.positions = []
		this.price = 0
	}

	computePrice() {
		this.price = this.positions.reduce((total, item) => {
			return total += item.cost * item.quantity
		}, 0)
	}

}