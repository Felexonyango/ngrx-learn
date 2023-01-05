import mongoose from 'mongoose';

export const connectDb = async () => {
  try{
       
    await mongoose.connect("mongodb://127.0.0.1:27017/leave",{
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify:false
       
    })
    console.log(`MongoDB Connected `)
} catch (error) {
  console.error(error )
        process.exit(1)
}
};