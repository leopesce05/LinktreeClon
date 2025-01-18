import mongoose from 'mongoose'
import colors from 'colors'

export const connectDB = async () => {
    try {
        const {connection} = await mongoose.connect(process.env.MONGODB_URI,{})
        const url = `${connection.host}:${connection.port}`;
        console.log( colors.blue.bold('Mongo DB Conectado en:') , url);
    } catch (error) {
        console.log(colors.bgRed(error.message));
        process.exit(1);
    }
}