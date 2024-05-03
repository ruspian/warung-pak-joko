import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import midtransClient from 'midtrans-client';
import 'dotenv/config';
import { response } from "express";

const clientKey = process.env.REACT_PUBLIC_CLIENT;
const serverKey = process.env.SECRET;

const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: serverKey,
    clientKey: clientKey,
})

const placeOrder = async (req, res) => {

    const frontendUrl = 'http://localhost:5173'

    try {
        // Periksa apakah req.body ada dan lengkap
        if (!req.body.userId || !req.body.items || !req.body.amount || !req.body.address) {
            return res.status(400).json({ success: false, message: "Invalid request body" });
        }
        
        // Buat pesanan baru dan simpan ke database
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });
        await newOrder.save();

        // Kosongkan keranjang belanja pengguna setelah pesanan dibuat
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Buat objek line_items untuk transaksi Midtrans
        const lineItems = req.body.items.map(item => ({
            name: item.nama,
            price: item.harga,
            quantity: item.quantity
        }));
        
        // Hitung total gross amount dari semua item dalam pesanan
        const grossAmount = req.body.items.reduce((total, item) => total + (item.harga * item.quantity), 0);

        // Buat objek transaksi untuk diproses oleh Midtrans
        const transactionDetails = {
            order_id: newOrder._id.toString(), // Gunakan ID pesanan yang baru dibuat
            gross_amount: grossAmount,
        };

        // Buat transaksi dengan Midtrans
        const transaction = await snap.createTransaction({
            transaction_details: transactionDetails,
            item_details: lineItems,
            customer_details: {
                first_name: req.body.address.namaDepan,
                last_name: req.body.address.namaBelakang,
                email: req.body.address.email,
                phone: req.body.address.noHP,
            }
        });

        // Dapatkan token transaksi dari respon Midtrans
        const transactionToken = transaction.token;

        if (transactionToken) {
             // Buat session URL sesuai dengan status pembayaran
             const sessionUrl = {
                success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
                pending_url: `${frontendUrl}/verify?success=pending&orderId=${newOrder._id}`,
                error_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,
                close_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`
             }
            // Kirim respons berhasil ke klien dengan token transaksi
            res.json({ success: true, transactionToken: transactionToken, sessionUrl: sessionUrl });
        } else {
            console.error("Snap token is undefined");
            // Tangani situasi ketika token transaksi tidak ditemukan
            res.status(500).json({ success: false, message: "Snap token is undefined" });
        }

    } catch (error) {
        console.error("Error placing order:", error);
        // Tangani kesalahan dan kirim respons kesalahan ke klien
        res.status(500).json({ success: false, message: "Error placing order" });
    }
}


// verifikasi order
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            // Perbarui status pembayaran menjadi true jika pengguna dialihkan ke successUrl
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Pembayaran berhasil diverifikasi" });
        } else if (success === "false") {
            // Hapus pesanan jika pengguna dialihkan ke pendingUrl atau errorUrl
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Pesanan dihapus karena pembayaran gagal" });
        } else {
            // Handle other cases if needed
            res.status(400).json({ success: false, message: "Invalid success value" });
        }
    } catch (error) {
        console.error("Error verifying order:", error);
        res.status(500).json({ success: false, message: "Terjadi kesalahan saat memverifikasi pesanan" });
    }
}



// user order frontend
const userOrder = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders }); // Perbaiki typo di sini dari res,json menjadi res.json
    } catch (error) {
        console.error(error); // Perbaiki typo di sini dari console.log menjadi console.error
        res.json({ success: false, data: 'error' });
    }
}

// list order dari admin panel
const listOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders })
    } catch (error) {
        console.error(error); // Perbaiki typo di sini dari console.log menjadi console.error
        res.json({ success: false, data: 'error' });
    }
}


// api untuk update order status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status:req.body.status});
        res.json({success: true, message: "Status Diperbaharui!"})
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: 'error' });
    }
}

export { placeOrder, verifyOrder, userOrder, listOrders, updateStatus };


