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

const updateEvent = async (req = request, res = response) => {
    const eventId = req.params.id;

    try {
        const eventDb = await Event.findById(eventId);

        if(!eventDb){
            return res.status(404).json({
                ok: false,
                msg: 'Couldnt find the event for this event id'
            });
        }

        if(eventDb.user.toString()!==req.uid){
            return res.status(401).json({
                ok: false,
                msg: 'User cant edit this event'
            });

        }

        const newEvent = {
            ...req.body,
            user: req.uid
        }

        const dbUpdatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true })

        return res.status(200).json({
            ok: true,
            event: dbUpdatedEvent
        });        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'There was a problem getting the event. Please cotact admin'
        })
    }

}

const deleteEvent = async (req = request, res = response) => {
    const eventId = req.params.id;

    try {
        const eventToDelete = await Event.findById(eventId);
        console.log(eventToDelete);

        if(!eventToDelete){
            return res.status(404).json({
                ok: false,
                msg: 'Cant find the event to delete'
            });
        }

        if(eventToDelete.user.toString()!== req.uid){
            return res.status(401).json({
                ok: false,
                msg:'User cant delete this event'
            })
        }

        await Event.findByIdAndDelete(eventId);

        return res.status(200).json({
            ok: true,
            msg: 'Event deleted',
            event: eventToDelete
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'There was an error deleting the event. Please contact admin'
        })
    }



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