const { request, response } = require('express');
const Event = require('../models/Event');


const getEvents = async (req = request, res = response) => {
    const events = await Event.find().populate('user','name');

    return res.status(200).json({
        ok: true,
        events
    });
}

const createEvent = async (req = request, res = response) => {
    console.log(req.body);

    //Save to database
    try {
        const eventModel = new Event(req.body);
        eventModel.user = req.uid;

        const dbEvent = await eventModel.save();

        return res.status(201).json({
            ok: true,
            event: dbEvent
        });
    

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'There was an error creating the event. please contact admin'
        });
    }    
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