import mongoose from "mongoose";

// schema
const foodSchema = new mongoose.Schema({
    nama: {type:String, required: true},
    deskripsi: {type:String, required: true},
    harga: {type:Number, required: true},
    gambar: {type:String, required: true},
    category: {type:String, required: true},
});

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

export default foodModel;