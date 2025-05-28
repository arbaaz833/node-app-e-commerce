import { NextFunction, Request, Response } from "express";
import { categories } from "../constants";

export const validateOrder = (req:Request,res:Response,next:NextFunction) => {
    const { productId, category, quantity, totalPrice } = req.body;

    if(!category || categories.includes(category) === false) {
        res.status(400).json({ error: 'Invalid category' });
        return 
    }
    if(!productId || typeof productId !== 'string') {
        res.status(400).json({ error: 'Invalid product ID' });
        return 
    }
    if(!quantity || typeof quantity !== 'number' || quantity <= 0) {
        res.status(400).json({ error: 'Invalid quantity' });
        return 
    }
    if(!totalPrice || typeof totalPrice !== 'number' || totalPrice <= 0) {
        res.status(400).json({ error: 'Invalid total price' });
        return 
    }
    next();
}