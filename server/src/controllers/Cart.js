import Cart from '../models/order.js'


// [Get]
export function list(req, res) {
    res.json("Hello")

}

export function addCart(req, res) {
    const data = req.body;
    console.log(data);
    if (data) {
        Cart.create(data)
            .then(newData => {
                res.status(201).json((newData))
            })
            .catch(err => res.status(500).json({ message: er }))
    }
    else {
        res.json("K có data")
    }
}


//[Get] cart/user/:id

export async function getCartByUserId(req, res) {
    try {
        const idUser = req.params.id;
        console.log(idUser);
        const cartUser = await Cart.findOne({ userId: idUser })
            .populate('userId')
            .populate({
                path: 'items.productId',
                populate: {
                    path: 'categoryId'
                }
            })

        console.log(cartUser)
        res.status(200).json(cartUser)
    } catch (error) {
        res.status(500).json({ message: error })
    }

}


//[PUT] by UserID
export async function updateItem(req, res) {
    try {
        const userId = req.params.id
        const data = req.body
        console.log(userId, data);

        if (!userId) {
            return res.status(400).json({ message: "Không thấy id" })
        }

        const cartNow = await Cart.findOne({ userId: userId });

        if (!cartNow || cartNow == {}) {
            return res.status(400).json({ message: "Không tìm thấy giỏ hàng" })
        }

        //Update item
        cartNow.items = data.items;
        console.log("da update");

        //Lưu vào trong CSDL
        await cartNow.save();


        res.status(200).json({
            message: "Cập nhật thành công",
            cartNow
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }


}