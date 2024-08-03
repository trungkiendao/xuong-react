import { useEffect, useState } from "react";
// import { Product } from "../types/Product";
import Loading from "../components/Loading";
import { Button, Container, IconButton, Stack, TextField, Typography } from "@mui/material";
import useProducts from "src/hooks/useProducts";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCart } from "src/context/cart";
import { CartItem, Product } from "src/types/Product";
// import apiUrl from "src/api/apiRoutes";



function ProductDetail() {
  
  const { product, id, loading, notFound,nav,categories} = useProducts();
  
  
  // useEffect(()=>{
  //   if(product && categories){
  //  const foundCate = categories.find(item=>
  //     item._id === product.categoryId
  //   )
  // }
    
  // })

  const {setCart } = useCart()
  const [quantity, setQuantity] = useState<number>(1)

  if (notFound) {
    return (
      <>
        <Loading isShow={loading} ></Loading>
        <Typography align="center" color="error" mt={3} fontSize={24}>
          Product not found
        </Typography>

      </>
    );
  }
  
  const handleAddToCart = (product:Product) =>{
    const cartsStorage = localStorage.getItem('carts') || '[]'
    const carts = JSON.parse(cartsStorage)
    
    const findItem = carts.find((item:CartItem)=>{
      return item.product._id === product._id
     
    })
    if(findItem){
      
        
        carts.map((cart:CartItem)=>{
          if(cart.product._id == findItem.product._id){
        

            cart.quantity = cart.quantity + quantity
            console.log(cart.quantity);
            
          }
          return cart;
        })

    }else{
    

      carts.push({product,quantity})
    }
    localStorage.setItem('carts',JSON.stringify(carts))
    setCart(carts.length)
    nav('/cart')
  }
  return (

    <>
      <Typography align="center" color={'#1976d2'} mt={5} fontSize={32}>Product {id}</Typography>
      <>
        <Loading isShow={loading} />
        
        <Container>
        {product && (
          <Stack direction={"row"} gap={3}>
            <img
              src={product.image}
              alt=""
              width={"300px"} 
              style={{ marginRight: '20px' }} 
            />
            <Stack gap={"24px"}>
              <Typography
                variant="h3"
                component={"h1"}
                fontSize={"32px"}
                fontFamily="Poppins"
              >
                {product.title}
              </Typography>
              <Typography
                color={"#9F9F9F"} 
                fontWeight={"bold"}
                fontSize={"24px"}
                fontFamily="Poppins"
              >
                Price: {product.price}
              </Typography>
              <Typography
                fontSize={"16px"} 
                fontFamily="Poppins"
              >
                {product.description}
              </Typography>

              <Typography fontFamily="Poppins">
                {/* Category: {product.categoryId} */}
                </Typography>

              <Stack direction={'row'} alignItems={'center'}>
                  <Typography> Số lượng:</Typography>
                  <IconButton onClick={() => setQuantity(quantity === 1 ? 1 : quantity - 1)}><RemoveIcon /></IconButton>
                  <TextField
                    label="Quantity"
                    variant="outlined"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  />
                  <IconButton onClick={() => setQuantity(quantity + 1)}><AddIcon /></IconButton>
                </Stack>

        
              <Button 
              variant="outlined" 
              onClick={()=>handleAddToCart(product)}
              sx={{
                backgroundColor: '#fff', 
                color: '#000', 
                border: '1px solid #000', 
                '&:hover': {
                  backgroundColor: '#f5f5f5' 
                },
                fontFamily: 'Poppins' 
              }}
              >
                Add to Cart
              </Button>

              
            </Stack>
          </Stack>
        )}
      </Container>
      </>
      );

    </>
  );
}
export default ProductDetail