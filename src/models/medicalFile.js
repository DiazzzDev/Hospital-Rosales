import { Schema, model } from "mongoose";

const pacientSchema = new Schema({
    patient_id: {
        type:Schema.Types.ObjectId,
        ref: "Pacients"
    },
    diagnosis: {type:String},
    medications: [{
        medicineName: {type: String}
    }],
    medicalNotes: {type:String},
}, {
    timestamps: true,
    strict: false
})

export default model("MedicalFile", pacientSchema)