const moment = require('moment');

const Order = require('../models/Order');
const responseHandler = require('../utils/responseHandler');

module.exports.overview = async function(req, res) {
	try {
		const allOrders = await Order.find({user: req.user._id}).sort({date: 1});
		const ordersMap = getOrdersMap(allOrders);	
		const arrayOrdersMapKeys = Object.keys(ordersMap);
		// Количество дней
		const daysNumber = arrayOrdersMapKeys.length;
		const lastDate = arrayOrdersMapKeys[daysNumber-1]
		const lastDayOrders = daysNumber > 0 ? ordersMap[lastDate] : [];
		// Количество заказов в последний день
		const totalOrdersLastDay = lastDayOrders.length;
		// Количество заказов
		const totalOrdersNumber = allOrders.length;
		// Количество заказов в день
		const ordersPerDay = (totalOrdersNumber / daysNumber).toFixed(0);
		// Процент для количества заказов
		const ordersPercent = (((totalOrdersLastDay / ordersPerDay) - 1) * 100).toFixed(2);
		// Общая выручка
		const totalGain = calculatePrice(allOrders);
		// Выручка в день 
		const gainPerDay = (totalGain / daysNumber).toFixed(2);
		// Выручка в последний день 
		const gainLastDay = calculatePrice(lastDayOrders);
		// Процент выручки
		const gainPercent = (((gainLastDay / gainPerDay) - 1) * 100).toFixed(2);
		// Сравнение выручки
		const compareGain = (gainLastDay - gainPerDay).toFixed(2);
		// Сравнение заказов
		const compareOrders = (totalOrdersLastDay - ordersPerDay).toFixed(2);
		responseHandler(res, 200, true, "Данные успешно расчитаны", {
			lastDate,
			gain: {
				percent: Math.abs(+gainPercent),
				compare: Math.abs(+compareGain),
				lastDay: Math.abs(+gainLastDay),
				isHigher: +gainPercent > 0,
				perDay: Math.abs(+gainPerDay)	
			},
			orders: {
				percent: Math.abs(+ordersPercent),
				compare: Math.abs(+compareOrders),
				lastDay: Math.abs(+totalOrdersLastDay),
				isHigher: +ordersPercent > 0,
				perDay: Math.abs(+ordersPerDay)
			}
		});
	}
	catch(error) {
		responseHandler(res, 500, false, error.message);
	};
};
module.exports.analytics = async function(req, res) {
	try {
		const allOrders = await Order.find({user: req.user._id}).sort({date: 1});
		const ordersMap = getOrdersMap(allOrders);	
		const arrayOrdersMapKeys = Object.keys(ordersMap);
		const daysNumber = arrayOrdersMapKeys.length;
		const average = +(calculatePrice(allOrders) / daysNumber).toFixed(2);
		const chart = arrayOrdersMapKeys.map(label => {
			return {
				label,
				gain: calculatePrice(ordersMap[label]),
				order: ordersMap[label].length
			}
		});
		responseHandler(res, 200, true, "Данные успешно расчитаны", {average, chart});
	}
	catch(error) {
		responseHandler(res, 500, false, error.message);
	};
};

function getOrdersMap(orders = []) {
	daysOrders = {}
	orders.forEach(order => {
		const date = moment(order.date).format('DD.MM.YYYY')

		if (!daysOrders[date]) {
			daysOrders[date] = []	
		};

		daysOrders[date].push(order);
	});
	return daysOrders;
};

function calculatePrice(orders = []) {
	return orders.reduce((total, order) => {
		const orderPrice = order.list.reduce((orderTotal, item) => {
			return orderTotal += item.cost * item.quantity;
		}, 0);
		return total += orderPrice;
	}, 0)
};