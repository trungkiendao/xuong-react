# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


   const handleAddToCart = (product:Product) =>{
    const cartsStorage = localStorage.getItem('carts') || '[]'
    const carts = JSON.parse(cartsStorage)
    const [addCart,setAddCart] = useState<boolean>(false)
    
    // const findItem = carts.find((item:CartItem)=>{
    //   item.product._id === product._id
     
    // })
    if(carts.length === 0){
      console.log('Cart rỗng');
      
      carts.push({product,quantity})
      
    }else{
    carts.forEach((cart:CartItem )=> {
      if(cart.product._id === product._id){
        cart.quantity = cart.quantity + quantity
        console.log(cart.quantity);
        setAddCart(false)
        
      }else{
        setAddCart(true)
        
        
      }
      
      
    });

  }
  if(addCart){
    carts.push({product,quantity})
  }
    localStorage.setItem('carts',JSON.stringify(carts))
    setCart(carts.length)
  }