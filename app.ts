import express, { Request, Response } from 'express';
import cors from 'cors';
import productsRouter from './products/products.router';
import path from 'path';

const assetsDir = path.join(__dirname,'uploads');
export const app = express();

app.use(express.json());
app.use(cors({credentials:true,origin:"*"}))
app.use('/uploads',express.static(assetsDir)); // Serve static files from the 'uploads' directory
app.use('/products', productsRouter);


app.get('/status',(req:Request,res:Response)=>{
    res.status(200).json({data:'All systems good.',error:null})
})



