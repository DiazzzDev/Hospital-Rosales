import controller from "../controller/pacitent.js"
import express from "express"

const router = express.Router()

router.route("/").get(controller.get)

//router.route("/:id").put(controller.put).delete(controller.delete)

export default router