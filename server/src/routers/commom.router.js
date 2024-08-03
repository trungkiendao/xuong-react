import express from 'express'
import { multiUpload, upload } from '../middleware/upload.js';
import { MultiUploadToDB, UploadDB, getImage } from '../controllers/CommonController.js'
var router = express.Router()


// Lấy danh sách sản phẩm
router.post('/upload', upload.single("image"), UploadDB);

router.post('/multiupload', multiUpload.array("images"), MultiUploadToDB);

router.get('/image', getImage);

export default router;


