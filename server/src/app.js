// thêm thư viện
import express from 'express';
import { engine } from 'express-handlebars'
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from "cors";
import 'dotenv/config'



//import Mongoose
import mongoose from 'mongoose';


//Connect database
mongoose.connect(process.env.CONNECTIONSTRING_MONGODB)
  .then(() => console.log('Connected!'));








const app = express()
app.use(cors());
const port = process.env.PORT

app.use(express.json());

//Middleware example
// app.use((req,res,next)=>{
//   //Logic
//   console.log("Middleware 1");
//   next();
// })


// app.use((req,res,next)=>{
//   console.log("Middleware 2");
//   next();

// })


//View duong dan tuyet doi
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// console.log(__dirname);

//Them duong dan tinh
app.use(express.static(path.join(__dirname,'uploads')))

//views
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
// console.log(__dirname);


app.set('views', path.join(__dirname, '/views'));


// nhận router từ routers/product.js
import productRouter from './routers/product.js'
// nhận router từ routers/category.js
import categoryRouter from './routers/category.js'
// nhận router từ routers/category.js
import userRouter from './routers/usersRouters.js'
import checkAuth from './middleware/Auth.js';
//Nhận router từ cart
import cartRouter from './routers/cart.js'
//Nhận router từ common
import commonRouter from './routers/commom.router.js'
//Nhan middleware upload
import { multiUpload, upload } from './middleware/upload.js';



//loại bỏ toàn bộ đường dẫn
//product
// app.use('/product',checkAuth, productRouter);
app.use('/product', productRouter);

app.use('/category', categoryRouter);

app.use('/user', userRouter);

app.use('/cart',cartRouter);



app.use('/',commonRouter)





//Trang chủ
app.get('/', (req, res) => {
  res.render('home');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})