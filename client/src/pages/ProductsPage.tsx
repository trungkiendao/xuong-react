import  {  useEffect, useState } from "react";
import { Box } from "@mui/material";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import axiosInstance from "src/api/instance";
import { Product } from "src/types/Product";
import { useLoading } from "src/context/loading";
import { useCart } from "src/context/cart";


function ProductsPage() {
  const { setCart } = useCart()

    const cartsStorage = localStorage.getItem('carts') || '[]'
    const carts = JSON.parse(cartsStorage)
    console.log(carts);
    setCart(carts.length)
  const [products, setProducts] = useState<Product[]>([]);
  const {loading,setLoading} = useLoading()
  

  const getAllProducts = async () => {
    setLoading(true);
    try {
      await new Promise (r=>setTimeout(r,2000))
      const { data } = await axiosInstance.get(`/product`);
      console.log(data);
      
      setProducts(data);
      
   
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
    
    <Box mt={5}
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      {loading ? (
        <Loading isShow={loading} />
      ) : (
        <Box
          display="grid"
          gridTemplateColumns="repeat(3, 1fr)"
          gap={3}
          justifyItems="center"
        >
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </Box>
      )}
    </Box>
   
    </>
  );
}

export default ProductsPage;
