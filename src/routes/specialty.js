import controller from "../controller/specialty.js"
import express from "express"

const router = express.Router()

router.route("/").get(controller.get).post(controller.new)

router.route("/:id").put(controller.put).delete(controller.delete)

export default router