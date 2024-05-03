import { error } from "console";
import foodModel from "../models/foodModel.js";
import fs from "fs";

// tambah item makanan 
const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`

    const food = new foodModel({
        nama: req.body.nama,
        deskripsi: req.body.deskripsi,
        harga: req.body.harga,
        category: req.body.category,
        gambar: image_filename,
    })
    try {
        await food.save();
        res.json({success: true, message: "Makanan Ditambahkan"})
    } catch {
        console.log(error);
        res.json({success: false, message: "Error"})
    }
}

// list semua makanan
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success : true, data : foods})
    } catch (error) {
        console.log(error)
        res.json({success : false, message : "error"})
    }
}

// hapus makanan
const removeFoods = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.gambar}`, () => {})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success : true, message : "Makanan Berhasil Dihapus"})
    } catch (error) {
        console.log(error)
        res.json({success : false, message : "error"})
    }
}

export { addFood, listFood, removeFoods };