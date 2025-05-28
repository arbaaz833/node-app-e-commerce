import express from 'express'
import productsController from './products.controller'
import multer from 'multer'
import path from 'path';
import fs from 'fs';
import { validateOrder } from './products.validation';

const uploadDir = path.join('uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const productsRouter = express.Router()
const upload = multer({ storage: storage });

productsRouter.get('/',productsController.get)
productsRouter.post('/create',upload.single('file'),productsController.create)
productsRouter.post('/create/order',validateOrder,productsController.createOrder)
productsRouter.patch('/update/:id',productsController.update)
productsRouter.get('/orders',productsController.orders)


export default productsRouter