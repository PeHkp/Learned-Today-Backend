import multer from 'multer';
import path from "path";
import crypto from 'crypto';

export default {
  storage: multer.diskStorage({
    destination : path.join(__dirname, "..","..","uploads"),
    filename: (request, file, cb) => {
      const fileHash = crypto.randomBytes(16).toString('hex');
      const filename = `${fileHash}-${Date.now()}-${file.originalname}`;
      cb(null,filename)
    }
  })
}