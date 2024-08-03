import Product from '../models/products.js';
import Category from '../models/categories.js';



// [Get]
export function list(req, res) {

    //Số phần tử có trong 1 trang
    const limit = req.query.limit || 10;
    //Vị trí trang
    const page = req.query.page || 1;
    //Số phần từ loại trước đó
    const skip = (page - 1) * limit;

    //$lt, $gt, $lte, $gte
    const filter = {}
    if (req.query.name) {
        filter.name = { $regex: req.query.name }
    }

    if (req.query.max) {
        filter.price = { $gte: req.query.max }
    }

    //Sắp xếp
    //1 là từ bé đến lớn
    //-1 là từ lớn đến bé
    const sort = { price: 1 }



    Product.find(filter).skip(skip).limit(limit).sort(sort)
        .populate('categoryId')
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.json({ message: "không có dữ liệu" })
            }

        })
        .catch((err) => {
            res.json({ message: err })
        })

}
// [Get] product by category ID
export async function getProductByCategoryId(req, res) {
    try {
        const cateId = req.params.id;
        // console.log(cateId);
        const listData = await Product.find({ categoryId: cateId }).populate("categoryId");
        res.json(listData)
    }
    catch (err) {
        res.json(err)
    }


}

//[Get By ID ]
export function productById(req, res) {
    const id = req.params.id;

    if (id) {

        Product.findById(id)
            .then(data => {
                console.log(data)
                res.json(data)
            })
            .catch(() => {
                res.json("Không tìm đc sản phẩm")
            })
    } else {
        res.json({ message: "Không tìm thấy id sản phẩm" })
    }



}


//[Post]
export function addProduct(req, res) {
    let data = req.body;
    if (data != []) {
        console.log(data);
        Product.create(data)

            .then(data => {
                res.json(data)
                console.log("Them thanh cong");
            })
            .catch(() => {
                res.json({ message: "Có lỗi khi thêm sản phẩm" })

            })
    } else {
        res.send('Không lấy được data')
    }



}


//[Update]

export function updateProduct(req, res) {
    const id = req.params.id;
    console.log(id);
    if (!id) {
        res.send("Không thấy ID ")

    } else {
        const data = req.body
        console.log(data);
        if (data == {}) {
            res.send("Không nhận được data")
        } else {
            Product.findByIdAndUpdate(id, data)
                .then(data => {

                    res.json(data)

                })
                .catch(() => {
                    res.json('Update thất bại')
                })

        }

    }



}



//[Delete]

export function deleteProduct(req, res) {
    const id = req.params.id
    if (!id) {
        res.json("Không tìm thấy ID")
    } else {
        Product.findByIdAndDelete(id)
            .then(data => {
                res.json(data)
            })
            .catch(() => {
                res.json("Xoá thất bại")
            })
    }
}
