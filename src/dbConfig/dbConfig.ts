import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.mongo_url!);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log('Mongodb Connected Successfully')
        })

        connection.on('error', (err) => {
            console.log('Mongodb connection error. Please make sure MongoDB is running' + err);
            process.exit();
        })
    } catch (error) {
        console.log('Something Goes Wrong');
        console.log(error);
    }
}