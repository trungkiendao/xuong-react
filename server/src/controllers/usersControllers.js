//Lấy data
import Users from "../models/usersModels.js"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import 'dotenv/config'


//[GET]
export function getUsers(req, res) {
    const query = req.query
    console.log(query.name);
    const filter = {};
    if (query.name) {
        filter.name = query.name;
    }

    Users.find(filter)
        .then(data => {
            res.json(data)
        })
        .catch(
            () => {
                res.json("Không tìm thấy dữ liệu")
            }
        )


}


//[GET by ID]
export function getUserById(req, res) {
    let id = req.params.id;
    if (!id) {
        res.json('K tìm thấy ID')
    } else {

        Users.findById(id)
            .then(data => {
                res.json(data)
            })
            .catch(
                (err) => {
                    res.json({ message: err })
                }
            )
    }


}

//[POST]
// export function signup(req, res) {
//     let data = req.body;
//     console.log(data);

//     if (data == []) {
//         res.json('K nhận được data')
//     } else {
//         console.log(data);
//         Users.create(data)
//             .then(addData => {
//                 res.json(addData)
//             })
//             .catch(
//                 (err) => {
//                     res.json({message: err })
//                 }
//             )
//     }


// }

//Signup - Dang ki 
export async function signup(req, res) {
    const data = req.body;
    console.log(data);

    //Check email
    const userExist = await Users.findOne({ email: data.email });

    if (userExist) {
        return res.json({
            message: 'Da ton tai email'
        })
    }

    //Ma hoa mat khau 
    const passwordHashed = await bcryptjs.hash(data.password, 10)

    //Thay the password cu bang passhash
    data.password = passwordHashed;

    //Them user moi 
    Users.create(data)
        .then(newData => {
            res.json(newData)
        })
        .catch(err => {
            res.json({ message: err })
        })



}

//Sign in 
export async function signin(req, res) {
    const data = req.body
    try {
        //B1 Kiểm tra user có tài khoản chưa
        const userExist = await Users.findOne({ email: data.username });

        if (!userExist) {
            return res.json({ message: "Sai tài khoản" })
        }

        const isCheck = await bcryptjs.compare(data.password, userExist.password)

        if (!isCheck) {
            return res.json({ message: "Sai mat khau " })
        }




        //Tao 1 token
        const token = await jwt.sign({ name: userExist.name, id: userExist._id }, process.env.KEY_SECRET, { expiresIn: "1h" })

        // //Xoa mat khau
        // userExist.password = undefined;

        res.json({
            message: "đăng nhập thành công",
            userExist,
            token
        })
    } catch (error) {
        res.json(error)
    }


}




//[UPDATE]
export function updateUser(req, res) {
    let id = req.params.id
    if (!id) {
        res.json("Không thấy ID")
    } else {
        let data = req.body;
        if (data == []) {
            res.json('K nhận được data')
        } else {
            console.log(data);
            Users.findByIdAndUpdate(id, data)
                .then(data => {
                    res.json(data)
                })
                .catch(
                    () => {
                        res.json("Update thất bại")
                    }
                )
        }
    }




}


//[DELETE]
export function deleteUserById(req, res) {
    let id = req.params.id;
    if (!id) {
        res.json('K tìm thấy ID')
    } else {

        Users.findByIdAndDelete(id)
            .then(data => {
                res.json(data)
            })
            .catch(
                () => {
                    res.json("Xoá không thành công")
                }
            )
    }


}