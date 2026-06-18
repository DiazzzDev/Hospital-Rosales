import bcrypt from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"
import {config} from "../../config.js"
import pacientModel from "../models/pacient.js"

const controller = {}

controller.login = async (req, res) => {
    try {
        const {email, password} = req.body
        const userFound = await pacientModel.findOne({email})

        if(!userFound){
            return res.status(404).json({message: "User not found"})
        }

        if(userFound.timeOut && userFound.timeOut > Date.now()){
            return res.status(404).json({message: "User has time out"})
        }

        const isMatch = await bcrypt.compare(password, userFound.password)

        if(!isMatch){
            //TODO: login attempts and timeout
            return res.status(401).json({message: "Credenciales incorrectas"})
        }

        userFound.loginAttempts = 0
        userFound.timeOut = null
        await userFound.save()

        const token = jsonwebtoken.sign(
            {id: userFound._id},
            config.JWT.secret,
            {expiresIn: "30d"}
        )

        res.cookie("authCookie", token)
        return res.status(200).json({message: "Sesión iniciada"})
    } catch (error) {
        console.log("Error + " + error)
        return res.status(500).json({message: "Error " + error})
    }
}

export default controller;