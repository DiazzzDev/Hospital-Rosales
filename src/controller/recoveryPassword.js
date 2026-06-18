import nodemailer from "nodemailer"
import crypto from "crypto"
import jsonwebtoken from "jsonwebtoken"
import bcrypt from "bcryptjs";
import model from "../models/pacient.js";
import {config} from "../../config.js"

const controller = {}

controller.forgotPassword = async (req, res) => {
    try {
        const {email} = req.body

        const existsUser = await model.findOne({email})
        
        if(!existsUser){
            return res.status(404).json({message: "Usuario no encontrado"})
        }

        const verificationCode = crypto.randomBytes(3).toString("hex")

        const tokenCode = jsonwebtoken.sign(
            {
                verificationCode,
                email, 
            },
            config.JWT.secret,
            {expiresIn:"15m"}
        )

        res.cookie("verificationToken", tokenCode, {maxAge:15*60*1000})

        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user: config.email.user_email,
                pass: config.email.user_password
            }
        })

        const mailOptions = {
            from: config.email.user_email,
            to: email,
            subject: "Recuperación de contraseña",
            text: "Código: " + verificationCode
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                console.log("Error: " + error)
                return res.status(500).json({message: "Error " + error})
            }
            return res.status(200).json({message: "Correo enviado"})
        })

    } catch (error) {
        console.log("Error + " + error)
        return res.status(500).json({message: "Error " + error})
    }
}

controller.verify = async (req, res) => {
    try {
        const {code, newPassword} = req.body
        const token = req.cookies.verificationToken

        const decoded = jsonwebtoken.verify(token, config.JWT.secret)
        const passwordHash = await bcrypt.hash(newPassword, 10)

        const {
            verificationCode: storedCode,
            email
        } = decoded

        const existsUser = await model.findOne({email})
        
        if(!existsUser){
            return res.status(404).json({message: "Usuario no encontrado"})
        }

        if(code !== storedCode){
            return res.status(400).json({message: "Código inválido"})
        }

        const userUpdated = await model.findOneAndUpdate(
            {email: decoded.email},
            {passwordHash: passwordHash},
            {new: true}
        )

        //existsUser.passwordHash = passwordHash

        existsUser.save()
        res.clearCookie("verificationToken")
        return res.status(201).json({message: "Contraseña reseteada"})

    } catch (error) {
        console.log("Error + " + error)
        return res.status(500).json({message: "Error " + error})
    }
}

export default controller