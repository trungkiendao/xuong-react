import { Navigate, useRoutes } from "react-router-dom"
import ProductDetail from "./pages/ProductDetail";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import LayoutClient from "./layouts/LayoutClient";
import ProductsPage from "./pages/ProductsPage";
import LayoutAdmin from "./layouts/LayoutAdmin";
import AdminList from "./pages/admin/products/AdminList";
import AdminAdd from "./pages/admin/products/AdminAdd";
import AdminEdit from "./pages/admin/products/AdminEdit";
import Cart from "./pages/Cart";
// import Test from "./pages/Test";



const routeConfig = [
  {
    // Router Client====================
    path: "/",
    element: <LayoutClient />,
    children: [
      {
        path: "/",
        element: <Navigate to="/products" />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "product/:id",
        element: <ProductDetail />
      },
      {
        path: "cart",
        element: <Cart/>,
    
      },
    ],
  },
  {
    // Router Admin
    path: "/admin",
    element: <LayoutAdmin />,
    children: [
      
      {
        path: "products/list",
        element: <AdminList />,
      },
      {
        path: "products/add",
        element: <AdminAdd />
      },
      {
        path: "products/edit/:id",
        element: <AdminEdit />
      },

    ],
  },

  {
    path: "/register",
    element: <Register />,

  },
  {
    path: "/login",
    element: <Login />,

  },

  // {
  //   path:"/test",
  //   element: <Test/>,
  // },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "",
        element: <></>
      }
    ]

  },
 
]



function App() {
  let routes = useRoutes(routeConfig)
  return routes
}

export default App;
