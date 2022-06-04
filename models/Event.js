const { Schema, model } = require('mongoose');

const EventSchema = Schema({
    title: {
        type: String,
        require: true
    },
    start: {
        type: Date,
        require: true
    },
    end: {
        type: Date,
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User' 
    },
});

module.exports = model('Event', EventSchema);