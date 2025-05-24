export type Product = {
    id: string;
    name: string;
    category: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
  };
  
  export type Order = {
    orderId: string;
    productId: string;
    quantity: number;
    totalPrice: number;
    orderDate: string;
    status: string; 
  }