export interface User {
	email: string,
	password: string
}
export interface Category {
	name: string
	imgSrc?: string
	user?: string
	_id?: string
}
export interface Data {
	status: boolean,
	message: string,
	data?: any
}
export interface Position {
	name: string,
	cost: number,
	user?: string,
	category: string,
	_id?: string,
	quantity?: number
}
export interface MaterialInstance {
	open?(): void
	close?(): void
	destroy?(): void
}
export interface Order {
	date?: Date,
	order?: number,
	user?: string,
	list: OrderPosition[],
	_id?: string
}
export interface OrderPosition {
	name: string,
	quantity: number,
	cost: number,
	_id?: string
}
export interface Filter {
	start?: Date,
	end?: Date,
	order?: number
}
export interface MaterialDatePicker extends MaterialInstance {
	date?: Date	
}
export interface OverviewPage {
	lastDate: string
	orders: OverviewPageItem,
	gain: OverviewPageItem
}
export interface OverviewPageItem {
	percent: number,
	campare: number,
	lastDay: number,
	isHigher: number,
	perDay: number
}