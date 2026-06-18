import model from "../models/medicalFile.js";

const controller = {}

controller.get = async (req, res) => {
    try {
        const data = await model.find()
        return res.status(200).json({message: data})
    } catch (error) {
        console.log("Error + " + error)
        return res.status(500).json({message: "Error " + error})
    }
}

controller.new = async (req, res) => {
    try {
        const {
            patient_id, 
            diagnosis, 
            medications, 
            medicalNotes,
        } = req.body

        const newData = new model({
            patient_id, 
            diagnosis, 
            medications, 
            medicalNotes,
        })

        await newData.save()

        return res.status(201).json({message: newData})

    } catch (error) {
        console.log("Error + " + error)
        return res.status(500).json({message: "Error " + error})
    }
}

controller.put = async (req, res) => {
    try {
        const {
            patient_id, 
            diagnosis, 
            medications, 
            medicalNotes
        } = req.body

        const updatedData = await model.findByIdAndUpdate(
            req.params.id,
            {
                patient_id, 
                diagnosis, 
                medications, 
                medicalNotes
            },
            {new:true}
        )

        if(!updatedData){
            return res.status(404).json({message: "Data not found"})
        }

        return res.status(200).json({message: updatedData})

    } catch (error) {
        console.log("Error + " + error)
        return res.status(500).json({message: "Error " + error})
    }
}

controller.delete = async (req, res) => {
    try {
        const deleteData = await model.findByIdAndDelete(req.params.id)

        if(!deleteData){
            return res.status(404).json({message: "Data not found"})
        }

        return res.status(204).json({message: "Data deleted"})
    } catch (error) {
        console.log("Error + " + error)
        return res.status(500).json({message: "Error " + error})
    }
}

export default controller;