import controller from "../controller/register.js"
import express from "express"
import upload from "../utils/cloudinaryConfig.js"

const router = express.Router()

router.route("/").post(upload.single("profilePhoto"), controller.new)

router.route("/verify").post(controller.verify)

export default router