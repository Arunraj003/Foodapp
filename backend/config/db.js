
import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://Mernstack:93512003@cluster0.bbzxkot.mongodb.net/Food-del').then(() =>console.log("DB CONNECTED!"));
}