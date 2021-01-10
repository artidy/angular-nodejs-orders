const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const keys = require('../config');
const User = require('../models/User');
const responseHandler = require('../utils/responseHandler');

module.exports.login = async function(req, res) {
	const {email, password} = req.body;
	try {
		const candidate = await User.findOne({email});
		if (candidate) {
			// if user exist check password
			const passwordResult = bcrypt.compareSync(password, candidate.password);
			if (passwordResult) {
				// Generate access token
				const token = jwt.sign({email: candidate.email, userId: candidate._id}, keys.SECRET_KEY, {expiresIn: 60 * 60});
				responseHandler(res, 200, true, 'Вы успешно авторизовались.', `Bearer ${token}`);
			}
			else {
				responseHandler(res, 401, false, 'Неверный пароль, попробуйте снова.');
			};
		}
		else {
			responseHandler(res, 404, false, `Пользователь с логином ${email} не найден. Вы можете зарегистрироваться.`);
		};
	}
	catch(error) {
		responseHandler(res, 500, false, error);
	};
};
module.exports.register = async function(req, res) {
	const {email, password} = req.body;
	try {
		const candidate = await User.findOne({email});
		if (candidate) {
			// User is exist
			responseHandler(res, 409, false, `Пользователь с логином ${email} уже существует, попробуйте другой.`);
		}
		else {
			// Create user
			const salt = bcrypt.genSaltSync(10); // for strongest protect our user password
			const user = new User({
				email,
				password: bcrypt.hashSync(password, salt)
			});
			await user.save();
			responseHandler(res, 201, true, 'Пользователь успешно создан, можете авторизоваться.');
		};
	}
	catch(error) {
		responseHandler(res, 500, false, error);
	};
};