import { Request, Response } from "express";
import path from 'path';
import { readData, writeData } from "../utils/fileUtils";
import { Order, Product } from "../types";
import fs from 'fs';

const productsFilePath = path.join('data', 'products.json');
const ordersFilePath = path.join('data', 'orders.json');

const uploadDir = path.join('uploads');

const get = async (req:Request, res:Response) => {
    try {
      const products = await readData(productsFilePath);
      res.status(200).json({data:products});
    } catch (error) {
      res.status(500).json({ error: 'Error fetching products' });
    }
}

const create = async (req:Request, res:Response) => {
    try {
      const products = await readData<Product>(productsFilePath);
      const newProduct = {
        id: `p${products.length + 1}`,
        ...req.body,
        price: parseFloat(req.body.price), 
        stock: parseInt(req.body.stock, 10) || 0, 
        imageUrl: req.file ? `/uploads/${req.file.originalname}` : '' 
      };
      products.push(newProduct);
      await writeData(productsFilePath, products);
      res.status(201).json({data:newProduct});
    } catch (error) {
      res.status(500).json({ error: 'Error adding product' });
    }
  }

const update = async (req:Request, res:Response):Promise<any> => {
    try {
      const products = await readData<Product>(productsFilePath);
      const id = req.params.id;
      const { newStock } = req.body; 
  
      const productIndex = products.findIndex(product => product.id === id);
      if (productIndex === -1) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      if (typeof newStock !== 'number' || newStock < 0) {
         return res.status(400).json({ error: 'Invalid stock value' });
      }
  
      products[productIndex].stock = newStock;
      await writeData(productsFilePath, products);
      res.status(200).json({data:products[productIndex]});
    } catch (error) {
      res.status(500).json({ error: 'Error updating stock' });
    }
  }

const orders = async (req:Request, res:Response) => {
    try {
      const orders = await readData<Order>(ordersFilePath);
      if (fs.existsSync(path.join(uploadDir, 'logo.svg'))) {
      console.log("FILE EXISTS");
      }
      // You might want to join product details here if needed for frontend
      const products = await readData<Product>(productsFilePath);
      const populatedOrders = orders.map(order => {
         const product = products.find(p => p.id === order.productId);
         return {
             ...order,
             productName: product ? product.name : 'Unknown Product',
             category: product ? product.category : 'N/A'
         };
      });
      res.status(200).json({data:populatedOrders});
    } catch (error) {
      res.status(500).json({ error: 'Error fetching orders' });
    }
  }

const productsController = {
    get,
    create,
    update,
    orders
  };
  export default productsController;