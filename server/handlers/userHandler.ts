import base from './baseHandler'
import User, { User as IUser } from '../models/User'

const getAllUsers = base.getAll<IUser>(User)
const getUser = base.getOne<IUser>(User)
const deleteUser = base.deleteOne<IUser>(User)
const updateUser = base.updateOne<IUser>(User)

export default { getAllUsers, getUser, deleteUser, updateUser }
