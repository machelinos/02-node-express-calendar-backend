/*
    Events routes
    host + /api/events
 */

const { validarJwt } = require('../middlewares/validar-jwt');
const { Router } = require('express');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');

const router = Router();

// All routes below this sgould use validarJWT middleware
router.use(validarJwt);

// Get events
router.get('/', getEvents);
    
// Create event
router.post('/', createEvent );

// Update event
router.put('/:id', updateEvent );

// Delete event
router.delete('/:id', deleteEvent);

module.exports = router;