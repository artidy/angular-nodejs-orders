module.exports = (res, statusCode, success, message, data = null) => {
	res.status(statusCode).json({success, message: message.message ? message.message: message, data});
};