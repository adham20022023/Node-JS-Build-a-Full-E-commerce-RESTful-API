const mongoose = require('mongoose');
const dbConnection = () =>{
    //! DB Connection
    const DB = process.env.DATABASE.replace(
        '<PASSWORD>',
        process.env.DATABASE_PASSWORD
    )
    mongoose
    .connection.on('disconnected',
    () => console.log('disconnected..')
    );
    mongoose
    .connection.on('reconnected',
    () => console.log('reconnected...')
    );

    mongoose
        .connect(DB, {
            //? we can type some options here 
        })
        .then((conn) => {        
            console.log(`DB connection successful! 🥳 ${conn.connection.host}`);
        })
        .catch((err) => {
            console.log("Database connection failed!", err);
            process.exit(1);
        })
}
module.exports = dbConnection