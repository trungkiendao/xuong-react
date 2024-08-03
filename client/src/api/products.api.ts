
import { Product } from "src/types/Product";
import instance from "./instance";

export const getAllProducts = () => {
  const uri = "products";
  return instance.get(uri);
};

export const getProductById = (id: number) => {
  const uri = `products/${id}`;  
  return instance.get(uri);
};

export const createProduct = (data: Product) => {
  const uri = "products";
  return instance.post(uri, data);
};

export const editProduct = (id: number, data: Product) => {
  const uri = `products/${id}`;  
  return instance.put(uri, data);
};

export const deleteProduct = (id: number) => { 
  const uri = `products/${id}`;
  return instance.delete(uri);
};
