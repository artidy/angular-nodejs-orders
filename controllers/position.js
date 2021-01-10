const Position = require('../models/Position');
const responseHandler = require('../utils/responseHandler');

module.exports.getPositions = async function(req, res) {
	const {categoryId} = req.params;
	try {
		const data = await Position.find({category: categoryId, user: req.user.id});
		responseHandler(res, 200, true, 'Запрос по позициям успешно сформирован.', data);
	}
	catch(error) {
		responseHandler(res, 500, false, error);
	};
};
module.exports.addPosition = async function(req, res) {
	const {name, cost, category, user} = req.body;
	try {
		const position = new Position({
			name,
			cost,
			category,
			user: req.user.id
		});
		await position.save();
		responseHandler(res, 201, true, 'Позиция успешно добавлена.', position);
	}
	catch(error) {
		responseHandler(res, 500, false, error);
	};
};
module.exports.changePosition = async function(req, res) {
	const {id} = req.params;
	try {
		const position = await Position.findOneAndUpdate(
			{_id: id},
			{$set: req.body},
			{new: true}
		);
		responseHandler(res, 202, true, 'Позиция успешно изменена.', position);	
	}
	catch(error) {
		responseHandler(res, 500, false, error);
	};
};
module.exports.deletePosition = async function(req, res) {
	const {id} = req.params;
	try {
		await Position.remove({_id: id});
		responseHandler(res, 202, true, 'Позиция успешно удалена.');	
	}
	catch(error) {
		responseHandler(res, 500, false, error);
	};
};