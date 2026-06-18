import controller from "../controller/pacitent.js"
import express from "express"
import upload from "../utils/cloudinaryConfig.js"

const router = express.Router()

router.route("/").get(controller.get)

router.route("/:id").put(upload.single("profilePhoto"), controller.put).delete(controller.delete)

export default router