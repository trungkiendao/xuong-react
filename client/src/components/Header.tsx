// import { AppBar, Box, Button, Container, Divider, Drawer, MenuItem, Toolbar, Typography } from "@mui/material"
// import { Link } from "react-router-dom"
import { Badge, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from 'react-router-dom';
import { useCart } from 'src/context/cart';

const Header = () => {
  const {Cart} = useCart()
  
  

  const menus = [
    {
      label: 'Home',
      link: '/home'
    },
    {
      label: 'Shop',
      link: '/shop'
    },
    {
      label: 'About',
      link: '/about'
    },
    {
      label: 'Contact',
      link: '/contact'
    }
  ]

  const Wrapper = styled(Stack)({
    height: 100,
    padding: '0 50px'
  })
  return (

    <Wrapper direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
      <img src="/logo.svg" alt="logo" />

      {/* Menu */}
      <Stack direction={'row'} gap={'75px'}>
        {menus.map((menu, index) => (
          <Link to={menu.link} key={index}>
            <Typography fontWeight={'500'}>{menu.label}</Typography>
          </Link>
        ))}
      </Stack>

      {/* Icon */}
      <Stack direction={'row'} gap={'45px'}>
        <PersonOutlineOutlinedIcon />
        <SearchOutlinedIcon />
        <FavoriteBorderOutlinedIcon />
        <Badge badgeContent={Cart} color="secondary">
          <ShoppingCartOutlinedIcon />
        </Badge>
      </Stack>
    </Wrapper>


  )
}

export default Header