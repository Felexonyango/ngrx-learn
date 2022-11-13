import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import User from './model/userModel.js'

import connectDB from './config/db.js'


dotenv.config()
connectDB()

 export const importData = async () => {
    try {
        // empty all models 
    
       await User.deleteMany()
       // Add user to models
        
        await User.insertMany(users)
      
        console.log('Data Imported')
    } catch (error) {
        console.log(`${error}`)
        process.exit(1)
    }
}
 export const destroyData = async () => {
    try {
        // empty all models 
     
       await User.deleteMany()
    
        console.log(`Data Destroyed !`)
    } catch (error) {
        console.log(`${error}`)
        process.exit(1)
    }
}

//node backend/seeder -d
if(process.argv[2] === '-d'){
    destroyData()
} else{
    importData()
}