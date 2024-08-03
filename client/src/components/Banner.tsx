// import { AppBar, Box, Button, Container, Divider, Drawer, MenuItem, Toolbar, Typography } from "@mui/material"
// import { Link } from "react-router-dom"
import {  Box, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';


// type BannerProps = {
//     page:string;
// }

const Banner = () => {
  const BannerImage = styled(Box)({
     backgroundImage: 'url(/banner.png)',
     height:'316px',
     

  })
  return (

    <BannerImage>
        <Stack justifyContent={'center'} alignItems={'center'} height={'100%'}>
            <img/>
            <Typography fontSize={48}>Cart</Typography>
            <Stack direction={'row'}>
                <Typography fontWeight={500}>Home</Typography>
                <ArrowForwardIosOutlinedIcon/>
                <Typography fontWeight={300}>Cart</Typography>
            </Stack>
        </Stack>
    </BannerImage>

  )
}

export default Banner