import modelEquipment from "../models/equipment.js"

const controller = {}

controller.get = async (req, res) => {
    try {
        const data = await modelEquipment.find()
        return res.status(200).json({message: data})
    } catch (error) {
        console.log("Error + " + error)
        return res.status(500).json({message: "Error " + error})
    }
}

controller.new = async (req, res) => {
    const {
        equipmentName, 
        description, 
        brand, 
        model,
        purchaseDate,
        maintenanceDate,
        condition
    } 
    = req.body

    const public_id = req.file.path
    const image = req.file.filename

    try {

        const newData = new modelEquipment({
            equipmentName, 
            description, 
            brand, 
            model,
            purchaseDate,
            maintenanceDate,
            condition,
            public_id,
            image
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
            equipmentName, 
            description, 
            brand, 
            model,
            purchaseDate,
            maintenanceDate,
            condition
        } = req.body

        const userFound = await model.findOne({email})

        if(!userFound){
            return res.status(404).json({message: "Data not found"})
        }

        const updatedData = {
            equipmentName, 
            description, 
            brand, 
            model,
            purchaseDate,
            maintenanceDate,
            condition,
            profilePhoto: req.file.path,
            public_id: req.file.filename
        }    

        if(req.file){
            await cloudinary.uploader.destroy(userFound.public_id)
            updatedData.profilePhoto = req.file.path
            updatedData.public_id = req.file.filename
        }
        
        await model.findByIdAndUpdate(
            req.params.id,
            updatedData,
            {new:true}
        )

        return res.status(200).json({message: updatedData})

    } catch (error) {
        console.log("Error + " + error)
        return res.status(500).json({message: "Error " + error})
    }
}

controller.put = async (req, res) => {
    try {
        const {specialtyName, description, isAvaliable} = req.body

        const updatedData = await modelEquipment.findByIdAndUpdate(
            req.params.id,
            {specialtyName, description, isAvaliable},
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
        const deleteData = await modelEquipment.findByIdAndDelete(req.params.id)

        if(!deleteData){
            return res.status(404).json({message: "Data not found"})
        }

        return res.status(204).json({message: "Data deleted"})
    } catch (error) {
        console.log("Error + " + error)
        return res.status(500).json({message: "Error " + error})
    }
}

export default controller