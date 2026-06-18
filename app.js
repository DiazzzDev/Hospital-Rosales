import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import logoutRoutes from "./src/routes/logout.js"
import specialtyRoutes from "./src/routes/specialty.js"
import appointmentRoutes from "./src/routes/appointment.js"
import filesRoutes from "./src/routes/medicalFile.js"
import equipmentRoutes from "./src/routes/equipment.js"
import pacientRoutes from "./src/routes/pacitent.js"
import loginRoutes from "./src/routes/login.js"
import registerRoute from "./src/routes/register.js"
import forgotPasswordRoute from "./src/routes/recoveryPassword.js"

const app = express()

app.use(cors({
    origin:["http:localhost:4000"],
    credentials: true
}))

app.use(cookieParser())

app.use(express.json())

app.use("/api/login", loginRoutes)
app.use("/api/logout", logoutRoutes)
app.use("/api/pacients", pacientRoutes)
app.use("/api/specialties", specialtyRoutes)
app.use("/api/appointments", appointmentRoutes)
app.use("/api/files", filesRoutes)
app.use("/api/equipments", equipmentRoutes)
app.use("/api/register", registerRoute)
app.use("/api/forgot-password", forgotPasswordRoute)

export default app