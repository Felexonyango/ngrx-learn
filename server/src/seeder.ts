import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users'
import {User} from './model/user'
import {connectDb} from './database/index'
import { Menu } from './model/menu'
import  MenuData  from './data/menu'


dotenv.config()
connectDb()

 export const importData = async () => {
    try {
       
    //    await User.deleteMany()
        await Menu.deleteMany()
        // await User.insertMany(users)
          await Menu.insertMany(MenuData)

        console.log('Data Imported')
    } catch (error) {
        console.log(`${error}`)
        process.exit(1)
    }
}
 export const destroyData = async () => {
    try {
        // empty all models 
     
       //await User.deleteMany()
       await Menu.deleteMany()
    
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