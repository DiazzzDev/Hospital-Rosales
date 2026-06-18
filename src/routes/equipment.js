import controller from "../controller/equipment.js"
import express from "express"
import upload from "../utils/cloudinaryConfig.js"

const router = express.Router()

router.route("/").get(controller.get).post(upload.single("image"), controller.new)

router.route("/:id").put(controller.put).delete(controller.delete)

export default router