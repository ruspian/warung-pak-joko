

import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bycript from "bcrypt";
import validator from "validator";

// user login
const userLogin = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if (!user) {
            return res.json({success: false, message: "Pengguna tidak Ditemukan!"})
        }

        const isMatch = await bycript.compare(password, user.password);
        if (!isMatch) {
            return res.json({success: false, message: "Password Salah!"})
        }

        const token = createToken(user._id);
        res.json({success: true, token});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"})
    }
}

// buat token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// user register
const userRegister = async (req, res) => {
    const {nama, password, email} = req.body;
    try {
        // cek user berhasil ditambahkan
        const exists = await userModel.findOne({email});
        if( exists ) {
            return res.json({ success: false, message: "Email Sudah Terdaftar" })
        }
        // validasi email format & password kuat
        if(!validator.isEmail(email)) {
            return res.json({success: false, message: "Email Anda Tidak Valid!"})
        }

        if (password.length < 8) {
            return res.json({success: false, message: "Sandi Minimal 8 Karakter"})
        }

        // hashing sandi pengguna
        const salt = await bycript.genSalt(10);
        const hashedPassword = await bycript.hash(password, salt);

        const userBaru = new userModel({
            nama:nama,
            email:email,
            password:hashedPassword
        });

        const user = await userBaru.save();
        const token = createToken(user._id);
        res.json({success: true, token});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"})
    }
}

export {userLogin, userRegister}