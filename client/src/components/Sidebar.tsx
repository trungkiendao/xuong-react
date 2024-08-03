import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ReactNode, useEffect } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import ChecklistIcon from '@mui/icons-material/Checklist';
import AddIcon from '@mui/icons-material/Add';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
const drawerWidth = 240;

const Sidebar = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()
  const handleLogOut = () =>{
    window.localStorage.removeItem('token')
  }
  const token = window.localStorage.getItem('token')


  // useEffect(()=>{
  // console.log("token",token);
  
  //   if(!token){
  //     navigate('/login')
  //   }
  // },[token,navigate])
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >


        {/* <List>
                   
                        <ListItem  >
                           
                        </ListItem>
                   
                </List> */}
        <List>

          <ListItem >
            <ListItemIcon>
              <HomeIcon></HomeIcon>
            </ListItemIcon>
            <Link to={'/products'} style={{ textDecoration: 'none' }}>
              <Typography sx={{ color: 'black' }}>
                <ListItemText primary="Trang chủ" />
              </Typography>
            </Link>




          </ListItem>


          <ListItem >
            <ListItemIcon>
              <ChecklistIcon />
            </ListItemIcon>
            <Link to={'/admin/products/list'} style={{ textDecoration: 'none' }}>
              <Typography sx={{ color: 'black' }}>
                <ListItemText primary="Danh sách sản phẩm" />
              </Typography>
            </Link>

          </ListItem>


          <ListItem>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <Link to={'/admin/products/add'} style={{ textDecoration: 'none' }}>
              <Typography sx={{ color: 'black' }}>
                <ListItemText primary="Thêm sản phẩm" />
              </Typography>
            </Link>
          </ListItem>
        </List>
        <Divider />

        <ListItem>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          
            <Button sx={{ color: 'black' }} onClick={()=>handleLogOut()}>
              <ListItemText primary="Log Out" />
            </Button>
        
        </ListItem>

      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', width: '100%' }}
      >
        {children}

      </Box>
    </Box>
  );
}

export default Sidebar