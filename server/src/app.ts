import * as dotenv from 'dotenv';
dotenv.config();
import express,{Application,NextFunction,Request,Response} from 'express'
import {PORT} from './config/index'
import {importData} from './seeder'
import cors from 'cors'
import passport from "passport";
require('./lib/passport')(passport)

//importing routes
import {authRoutes} from "./routes/authRoutes"
import {userRoutes} from "./routes/userRoutes"
import { connectDb } from './database';
const  app:Application =express()
app.use(express.json());



app.use((req:Request, res:Response, next:NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

connectDb()





 app.use(cors())

 
//routes defination
app.use("/api/auth",authRoutes)
 app.use("/api/user", userRoutes)

 //updated body-parser for ts node 
 app.use(express.json());
app.listen(PORT, ()=>console.log("server is listnening at port 5000"))

