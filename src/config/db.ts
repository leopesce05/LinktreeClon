import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        const {connection} = await mongoose.connect(process.env.MONGODB_URI,{})
        const url = `${connection.host}:${connection.port}`;
        console.log('Mongo DB Conectado en:', url);
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}