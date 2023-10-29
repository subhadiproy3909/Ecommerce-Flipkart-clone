const mongoose = require('mongoose');


const connectDB = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URL, {
            useUnifiedTopology: true
        });

        console.log(`Database connected: ${conn.connection.host}`);
    }
    catch(err){
        console.log(`dbconn error: ${err.message}`);
    }
}

module.exports = connectDB;