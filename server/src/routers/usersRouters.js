import express from 'express'

import { getUsers,getUserById, updateUser, deleteUserById, signup ,signin} from '../controllers/usersControllers.js'




var router = express.Router()


//GET
router.get('/',getUsers)


//GET BY ID
router.get('/:id', getUserById)


//Sign up
router.post('/signup',signup)

//Signin
router.post('/signin',signin)


//PUT
router.put('/:id',updateUser)

//DELETE
router.delete('/:id', deleteUserById)



export default router;