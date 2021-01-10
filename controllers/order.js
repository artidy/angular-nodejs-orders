const Order = require('../models/Order');
const responseHandler = require('../utils/responseHandler');

module.exports.getAllOrders = async function(req, res) {
	const {offset, limit, start, end, order} = req.query;
	const query = {
		user: req.user.id
	};
	// Период отбора
	if (start) {
		query.date = {
			// Больше или равно
			$gte: start
		};
	};
	if (end) {
		if (!query.date) {
			query.date = {};
		};
		// Меньше или равно
		query.date.$lte = end;
	};
	if (order) {
		query.order = +order;
	};

	try {
		const orders = await Order
			.find(query)
			.sort({date: -1})
			.skip(+offset)
			.limit(+limit);
		responseHandler(res, 200, true, 'Список заказов выгружен.', orders);
	}
	catch(error) {
		responseHandler(res, 500, false, error);
	};
};
module.exports.addOrder = async function(req, res) {
	const {list} = req.body;
	const {id} = req.user;
	try {
		const lastOrder = await Order.findOne({user: id}).sort({date: -1});
		const nextOrder = lastOrder ? lastOrder.order + 1 : 1;
		const order = new Order({
			list,
			user: id,
			order: nextOrder
		});
		await order.save();
		responseHandler(res, 201, true, `Заказ № ${nextOrder} был добавлен.`, order);
	}
	catch(error) {
		responseHandler(res, 500, false, error);
	};
};
module.exports.clearOrders = async function(req, res) {
	try {
		await Order.deleteMany({})
		responseHandler(res, 201, true, 'Все заказы успешно удалены.');
	}
	catch(error) {
		responseHandler(res, 500, false, error);
	};
};