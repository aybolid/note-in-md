import base from './baseHandler'
import User from '../models/User'

const getAllUsers = base.getAll(User)
const getUser = base.getOne(User)
const deleteUser = base.deleteOne(User)
const updateUser = base.updateOne(User)

export default { getAllUsers, getUser, deleteUser, updateUser }
