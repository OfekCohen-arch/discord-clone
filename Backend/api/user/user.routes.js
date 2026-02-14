import express from 'express'

import { getUsers,getUser,deleteUser,updateUser,addUser } from './user.controller.js'
export const userRoutes = express.Router()

userRoutes.get('/',getUsers)
userRoutes.get('/:userId',getUser)
userRoutes.delete('/:userId',deleteUser)
userRoutes.post('/',addUser)
userRoutes.put('/:userId',updateUser)