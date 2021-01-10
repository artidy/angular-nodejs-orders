const app = require('./app');
const keys = require('./config');
const port = keys.PORT;

app.listen(port, () => {
	console.log(`Server has been started on ${port}`);
});