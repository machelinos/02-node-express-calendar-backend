const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
       await mongoose.connect(process.env.DB_CNNCT);
        console.log('connected to db');
    } catch (error) {
        console.log(error);
        throw new Error('Couldn´t init DB');
    }
}

module.exports = {
    dbConnection
}