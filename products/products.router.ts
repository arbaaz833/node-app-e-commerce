import express from 'express'
import productsController from './products.controller'
import multer from 'multer'
import { storage } from '../server';
const productsRouter = express.Router()
const upload = multer({ storage: storage });

productsRouter.get('/',productsController.get)
productsRouter.post('/create',upload.single('file'),productsController.create)
productsRouter.patch('/update',productsController.update)
productsRouter.get('/orders',productsController.orders)


export default productsRouter