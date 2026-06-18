import crypto from "crypto"
import nodemailer from "nodemailer"
import jsonwebtoken from "jsonwebtoken"
import bcrypt from "bcryptjs";
import model from "../models/pacient.js";
import {config} from "../../config.js"

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
            return res.status(400).json({message: ""})
        }

    } catch (error) {
        console.log("Error + " + error)
        return res.status(500).json({message: "Error " + error})
    }
}

export default controller;