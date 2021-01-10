const express = require('express');
const router = express.Router();
const passport = require('passport');

const controller = require('../controllers/order');

router.get('/', passport.authenticate('jwt', {session: false}), controller.getAllOrders);
router.post('/', passport.authenticate('jwt', {session: false}), controller.addOrder);
router.delete('/', passport.authenticate('jwt', {session: false}), controller.clearOrders);

module.exports = router;