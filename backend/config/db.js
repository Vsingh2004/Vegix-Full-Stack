import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://vegix:vegixpassword@cluster0.zir1q4k.mongodb.net/food-del')
    .then(() => console.log("DB Connected"))
}