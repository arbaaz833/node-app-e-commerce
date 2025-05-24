import fs from 'fs/promises';
import { Product } from '../types';


export const readData = async <T>(filePath:string):Promise<T[]> => {
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error reading file ${filePath}:`, error);
      throw error; // Re-throw to be caught by route handlers
    }
  };
  
  
  export const writeData = async (filePath:string, data:Product[]) => {
    try {
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
      console.error(`Error writing file ${filePath}:`, error);
      throw error;
    }
  };