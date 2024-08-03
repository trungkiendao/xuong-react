import * as React from 'react';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
// import axios from "axios";
import { Product } from "../types/Product";
import { Box, styled } from '@mui/material';

type ProductCardProps = {
  product: Product;
}

const HoverBox = styled(Box)(() => ({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  opacity: 0,
  transition: 'opacity 0.3s ease',
  '&:hover': {
    opacity: 1,
  },
}));

const ProductCardContainer = styled(Card)(() => ({
  position: 'relative',
  maxWidth: 345,
}));

const StyledButton = styled(Button)(() => ({
  backgroundColor: '#fff',
  color: '#b88e2f',
  border: '1px solid #b88e2f',
  width: '80%',
  margin: '15px 10px',
  '&:hover': {
    backgroundColor: '#b88e2f',
    color: '#fff',
  },
  fontSize: '12px',
  
}));

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <ProductCardContainer>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          alt={product.title}
          height="300"  
          image={product.image}
        />
        <HoverBox>
          <Box sx={{ width: '80%' }}>
            <Link to={`/product/${product._id}`}>
            <StyledButton>
              Thêm vào giỏ hàng
            </StyledButton>
            </Link>
          </Box>
          <Box sx={{ width: '80%' }}>
            <Link to={"/product/" + product._id} style={{ width: '80%', textDecoration: 'none' }}>
              <StyledButton>
                Xem chi tiết
              </StyledButton>
            </Link>
          </Box>
        </HoverBox>
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h3" component="div" sx={{ fontSize: '24px', fontFamily:'Poppins' }}>
          {product.title}
        </Typography>
        <Typography gutterBottom variant="h3" component="div" sx={{ fontSize: '24px'  ,fontFamily:'Poppins'  }}>
          {product.price}
        </Typography>
      
      </CardContent>
      
    </ProductCardContainer>
  );
};

export default ProductCard;
