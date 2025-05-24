import express, { Request, Response } from 'express';
import cors from 'cors';
import productsRouter from './products/products.router';
export const app = express();




app.use(express.json());
app.use(cors({credentials:true,origin:"*"}))
 
app.use('/products', productsRouter);


app.get('/status',(req:Request,res:Response)=>{
    res.status(200).json({data:'All systems good.',error:null})
})



