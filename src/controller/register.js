import crypto from "crypto"
import nodemailer from "nodemailer"
import jsonwebtoken from "jsonwebtoken"
import bcrypt from "bcryptjs";
import model from "../models/pacient.js";
import {config} from "../../config.js"
import {v2 as cloudinary} from "cloudinary"

const controller = {}

controller.new = async (req, res) => {
    const {
        name, 
        lastname, 
        email, 
        password, 
        phone, 
        address, 
        phoneEmergencyContacts    
    } = req.body

    const public_id = req.file.path
    const photo = req.file.filename

    try {
        const existsUser = await model.findOne({email})
        
        if(existsUser){
            return res.status(409).json({message: "Usuario ya existe"})
        }

        const passwordHash = await bcrypt.hash(password, 10)

        const verificationCode = crypto.randomBytes(3).toString("hex")

        const tokenCode = jsonwebtoken.sign(
            {
                verificationCode,
                name, 
                lastname, 
                email, 
                passwordHash, 
                phone, 
                address, 
                phoneEmergencyContacts,
                public_id,
                photo    
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
            subject: "Verificación de cuenta",
            text: "Código: " + verificationCode
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                console.log("Error: " + error)
                return res.status(500).json({message: "Error " + error})
            }
            return res.status(200).json({message: "Usuario creado"})
        })

    } catch (error) {
        console.log("Error + " + error)
        return res.status(500).json({message: "Error " + error})
    }
}

controller.verify = async (req, res) => {
    try {
        const {code} = req.body
        const token = req.cookies.verificationToken

        const decoded = jsonwebtoken.verify(token, config.JWT.secret)

        const {
            verificationCode: storedCode,
            name,
            lastName,
            email,
            password,
            phone,
            address,
            phoneEmergencyContacts,
            profilePhoto,
            public_id,
            loginAttempts,
            timeOut
        } = decoded

        if(code !== storedCode){
            return res.status(400).json({message: "Código inválido"})
        }

        const newPatient = new model({
            name,
            lastName,
            email,
            password,
            phone,
            address,
            phoneEmergencyContacts,
            profilePhoto,
            public_id,
            isVerified: true,
            loginAttempts,
            timeOut,
        })

        newPatient.save()
        res.clearCookie("verificationToken")
        return res.status(201).json({message: "Paciente creado"})

    } catch (error) {
        console.log("Error + " + error)
        return res.status(500).json({message: "Error " + error})
    }
}

export default controller;