import dotenv from "dotenv";

dotenv.config()

export const config = {
    db: {
        URI: process.env.DB_URI
    },
    JWT: {
        secret: process.env.JWT_SECRET
    },
    email: {
        user_email: process.env.USER_EMAIL,
        user_password: process.env.USER_PASSWORD
    },
    cloudinary: {
        CLOUDINARY_ID: process.env.CLOUDINARY_ID,
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
    }
}