import express from 'express'
import helloController from '../controllers/helloController'

const router = express.Router()

router.get('/', helloController.sayHello)

export default router
