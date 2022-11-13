import mongoose from 'mongoose';

export const connectDb = async () => {
  try{
       
    const conn = await mongoose.connect("mongodb://localhost:27017/leave",{
        useUnifiedTopology: true,
        useNewUrlParser: true,
       
    })
    console.log(`MongoDB Connected`)
} catch (error) {
  console.error(error )
        process.exit(1)
}
};