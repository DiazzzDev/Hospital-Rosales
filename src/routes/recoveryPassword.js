import controller from "../controller/recoveryPassword.js"
import express from "express"

const router = express.Router()

router.route("/").post(controller.forgotPassword)

export default router