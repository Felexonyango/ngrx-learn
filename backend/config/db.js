import mongose from 'mongoose'

// a mongoose stuf (mongoose.connect ....) return always a promise
const connectDB = async () => {
    try{
       
        const conn = await mongose.connect("mongodb://localhost:27017/leave",{
            useUnifiedTopology: true,
            useNewUrlParser: true,
           
        })
        console.log(`MongoDB Connected`)
    } catch (error) {
      console.error(error )
            process.exit(1)
    }
}

export default connectDB