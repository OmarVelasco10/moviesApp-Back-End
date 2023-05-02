const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN);

        console.log('DB Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error when initializing DB');
    }
}

module.exports = {
    dbConnection
}