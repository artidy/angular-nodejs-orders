const Category = require('../models/Category');
const Position = require('../models/Position');
const responseHandler = require('../utils/responseHandler');

module.exports.getAllCategory = async function(req, res) {
	try {
		const data = await Category.find({user: req.user.id});
		responseHandler(res, 200, true, 'Запрос по категориям успешно сформирован.', data);
	}
	catch(error) {
		responseHandler(res, 500, false, error);
	};
};
module.exports.getCategory = async function(req, res) {
	try {
		const data = await Category.findById(req.params.id);
		responseHandler(res, 200, true, 'Категория успешно получена', data);
	}
	catch(error) {
		responseHandler(res, 500, false, error);
	};
};
module.exports.deleteCategory = async function(req, res) {
	const {id} = req.params;
	try {
		await Category.deleteOne({_id: id});
		await Position.deleteMany({category: id});
		responseHandler(res, 200, true, 'Категория успешно удалена.');
	}
	catch(error) {
		responseHandler(res, 500, false, error);
	};
};
module.exports.addCategory = async function(req, res) {
	const {name} = req.body;
	try {
		const category = new Category({
			name,
			user: req.user.id,
			imgSrc: req.file ? req.file.path : ''
		});
		await category.save();
		responseHandler(res, 201, true, 'Категория успешно создана.', category);
	}
	catch(error) {
		responseHandler(res, 500, false, error);
	};
};
module.exports.changeCategory = async function(req, res) {
	const {id} = req.params;
	try {
		const newCategory = {
			name: req.body.name
		};
		if (req.file) {
			newCategory.imgSrc = req.file.path;	
		};
		const category = await Category.findOneAndUpdate(
			{_id: id},
			{$set: newCategory},
			{new: true}
		);
		responseHandler(res, 202, true, 'Позиция успешно изменена.', category);	
	}
	catch(error) {
		responseHandler(res, 500, false, error);
	};
};