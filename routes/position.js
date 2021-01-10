const express = require('express');
const router = express.Router();
const passport = require('passport');

const controller = require('../controllers/position');

router.get('/:categoryId', passport.authenticate('jwt', {session: false}), controller.getPositions);
router.post('/', passport.authenticate('jwt', {session: false}), controller.addPosition);
router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.changePosition);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.deletePosition);

module.exports = router;