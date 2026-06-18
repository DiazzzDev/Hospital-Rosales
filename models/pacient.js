import { Schema, model } from "mongoose";

const pacientSchema = new Schema({
    name: {type:String},
    lastName: {type:String},
    email: {type:String},
    password: {type:String},
    phone: {type:String},
    address: {type:String},
    phoneEmergencyContacts: [
        {type: String}
    ],
    profilePhoto: {type:String},
    isVerified: {type:Boolean},
    loginAttempts: {type: Number},
    timeOut: {type:Number},
}, {
    timestamps: true,
    strict: false
})

export default model("Pacients", pacientSchema)