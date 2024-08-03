import Category from '../models/categories.js';

export function list(req, res) {
    Category.find()
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