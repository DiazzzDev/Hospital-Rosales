import controller from "../controller/recoveryPassword.js"
import express from "express"

const router = express.Router()

router.route("/").post(controller.forgotPassword)

router.route("/verify").post(controller.verify)

export default router