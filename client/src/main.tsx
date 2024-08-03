import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { LoadingProvider } from './context/loading.tsx';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
// import { RouterProvider } from 'react-router-dom'
// import routers from './router.tsx'

// Mở rộng chủ đề để thêm thuộc tính customColor
declare module '@mui/material/styles' {
  interface Palette {
    customColor: Palette['primary'];
  }
  interface PaletteOptions {
    customColor?: PaletteOptions['primary'];
  }
}

const theme = createTheme({
  palette: {
    
    customColor: { // Thêm object màu tùy chỉnh
      main: '#F9F1E7',
      light: '#33eb91',
      dark: '#00a152',
      contrastText: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
    },
  },
  spacing: 8,
});
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <LoadingProvider>
      <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>

    </LoadingProvider>
    
    </BrowserRouter>
  </React.StrictMode>,
  // <RouterProvider router={routers}/>
)
