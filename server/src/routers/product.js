import  express from 'express'
import {list,addProduct,productById,updateProduct,getProductByCategoryId, deleteProduct} from '../controllers/ProductController.js'
import checkAuth from '../middleware/Auth.js'


var router = express.Router()

// Lấy danh sách sản phẩm
router.get('/', list);

//Lấy danh sách sản phẩm theo categoryID
router.get('/category/:id',getProductByCategoryId)

//Tìm sản phẩm theo ID 
router.get('/:id', productById);

// Thêm sản phẩm
router.post('/', addProduct);

// update sản phẩm
router.put('/:id', updateProduct)
// xóa sản phẩm
router.delete('/:id', deleteProduct)

export default router;