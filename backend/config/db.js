import mongose from 'mongoose'

// a mongoose stuf (mongoose.connect ....) return always a promise
const connectDB = async () => {
    try{
       
        const conn = await mongose.connect("mongodb+srv://DevConnector:DevConnector@cluster0.p8gpj.mongodb.net/myFirstDatabase?retryWrites=true",{
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