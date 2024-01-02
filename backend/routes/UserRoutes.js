
import express from "express"
import UserController from "../controller/User.js"
const  router = express.Router()


router.post("/users", UserController.createUser)


export default router

