import model from "../models/pacient.js"

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