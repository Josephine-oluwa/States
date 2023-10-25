import express from "express"
import { SignInUser, createUser, getOneUser, updateUser, } from "../Controller/userController"
import multer from "multer"

let upload = multer().single("avatar")

const Router = express.Router()

Router.route("/create-auth").post(createUser)
Router.route("/sign-in-auth").post(SignInUser )
Router.route("/update-auth/:userID").patch(upload, updateUser)
Router.route("/get-one-user/:userID").get(getOneUser)

export default Router