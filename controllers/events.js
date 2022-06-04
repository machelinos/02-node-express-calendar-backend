const { request, response } = require('express');

const getEvents = (req = request, res = response) => {
    return res.status(200).json({
        ok: true,
        msg: 'Get Events'
    });
}

const createEvent = (req = request, res = response) => {
    console.log(req.body);
    
    return res.status(201).json({
        ok: true,
        msg: 'Create event'
    });
}

const updateEvent = (req = request, res = response) => {
    return res.status(200).json({
        ok: true,
        msg: 'Update event'
    });
}

const deleteEvent = (req = request, res = response) => {
    return res.status(200).json({
        ok: true,
        msg: 'Delete event'
    });
}
module.exports = {
    createEvent,
    deleteEvent,
    getEvents,
    updateEvent
}