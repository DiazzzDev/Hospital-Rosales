import { Schema, model } from "mongoose";

const specialtySchema = new Schema({
    specialtyName: {type:String},
    description: {type:String},
    isAvaliable: {type:Boolean},
}, {
    timestamps: true,
    strict: false
})

export default model("Specialty", specialtySchema)