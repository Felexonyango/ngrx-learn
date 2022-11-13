import Aws from 'aws-sdk';
import multer from 'multer'
import multerS3 from 'multer-s3'
import { Access_Key,Secret_Access}from '../config/index'

const ID = Access_Key ;
const SECRET = Secret_Access;
const BUCKET_NAME = 'nyapp';

const s3 = new Aws.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET,
    region: 'us-east-1',
    
})

export const upload={

AWS:multer({
    
    storage:  multerS3({
        s3: s3,
        
        bucket: BUCKET_NAME,
        key: function (req, file, cb) {
            
            cb(null, file.originalname); 
        }
    })
})



}