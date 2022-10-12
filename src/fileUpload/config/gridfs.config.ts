import { randomUUID } from 'crypto';
import * as multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';

export const storage = new GridFsStorage({
  url: 'mongodb://localhost:27017/uploads',
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = file.originalname + randomUUID();
      const fileInfo = {
        filename: filename,
        bucketName: 'uploads',
      };
      resolve(fileInfo);
    });
  },
});

export const upload = multer({ storage: storage });
