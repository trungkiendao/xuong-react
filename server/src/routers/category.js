import  express from 'express'
import { list } from '../controllers/CategoryController.js'
var router = express.Router()

// Lấy danh sách category
router.get('/', list);
export default router;