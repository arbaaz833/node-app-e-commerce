import http from 'http';
import multer from 'multer';
import { app } from './app';


export const server = http.createServer(app)
export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});



(async () => {
    server.listen(3001, () => {
        console.log(`Server is running on port ${3001}`);
    });
})()

