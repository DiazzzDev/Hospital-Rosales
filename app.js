import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import logoutRoutes from "./routes/logout.js"

const app = express()

app.use(cors({
    origin:["http:localhost:4000"],
    credentials: true
}))

app.use(cookieParser())

app.use(express.json())

//app.use("/api/login", loginRoutes)
app.use("/api/logout", logoutRoutes)
//app.use("/api/pacients", pacientRoutes)
//app.use("/api/specialties", pacientRoutes)
//app.use("/api/appointments", pacientRoutes)
//app.use("/api/files", pacientRoutes)
//app.use("/api/equipments", pacientRoutes)

export default app