import multer from "multer";
import {v2 as cloudinary} from "cloudinary"
import { config } from "../../config.js";
import {CloudinaryStorage} from "multer-storage-cloudinary"

cloudinary.config({
    cloud_name: config.cloudinary.CLOUDINARY_ID,
    api_key: config.cloudinary.CLOUDINARY_API_KEY,
    api_secret: config.cloudinary.CLOUDINARY_API_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:"HospitalRosales",
        allowed_formats:["jpg", "png", "jpeg"]
    }
})

const upload = multer({storage})

export default upload