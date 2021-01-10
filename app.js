const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mogoose = require('mongoose');
const passport = require('passport');

const passportMiddleware = require('./middleware/passport');
const authRoutes = require('./routes/auth');
const authAnalytics = require('./routes/analytics');
const authCategory = require('./routes/category');
const authOrder = require('./routes/order');
const authposition = require('./routes/position');
const keys = require('./config');
const app = express();

mogoose.connect(keys.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true
	})
	.then(() => console.log('MongoDB connected'))
	.catch((error => console.log(error)));

app.use(passport.initialize());
passportMiddleware(passport);
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/analytics', authAnalytics);
app.use('/api/category', authCategory);
app.use('/api/order', authOrder);
app.use('/api/position', authposition);

module.exports = app;