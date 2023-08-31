import mongoose from 'mongoose';

export const connectDb = async () => {
  try{
    const DB ="mongodb+srv://felexonyango19:DZRzdnzwYyPQuS7l@cluster0.twgi0oh.mongodb.net/myFirstDatabase?retryWrites=true"
    await mongoose.connect(DB,{
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