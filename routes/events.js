/*
    Events routes
    host + /api/events
 */

const { validarJwt } = require('../middlewares/validar-jwt');
const { Router } = require('express');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

const router = Router();

// All routes below this sgould use validarJWT middleware
router.use(validarJwt);

// Get events
router.get('/', getEvents);
    
// Create event
router.post('/',
[
    check('title', 'Title is required').not().isEmpty(),
    check('start', 'Start date is required').custom(isDate),
    check('end', 'End date is required').custom(isDate),
    validarCampos
],
createEvent );

// Update event
router.put('/:id', updateEvent );

// Delete event
router.delete('/:id', deleteEvent);

module.exports = router;