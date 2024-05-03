import jwt from 'jsonwebtoken';
// import midtransClient from 'midtrans-client';

// export const midtransmidleware = async (req, res, next) => {

//     const snap = new midtransClient.Snap({
//         isProduction: false,
//         serverKey: process.env.SECRET,
//         clientKey: process.env.REACT_PUBLIC_CLIENT,
//     })

//     const { midToken } = req.body;

//     if (!midToken) {
//         return res.json({success: false, message: "Tidak diizinkan, Silahkan login kembali!"})
//     }
//     try {
//         const tokenDecode = snap.createTransactionToken(midToken, process.env.SECRET);
//         req.body.userId = tokenDecode.id;
//         next();
//     } catch (error) {
//         console.log(error);
//         res.json({success: false, message: "Error"})
//     }
// }

const authMiddleware = async ( req, res, next ) => {
    const { token } = req.headers;

    if (!token) {
        return res.json({success: false, message: "Tidak diizinkan, Silahkan login kembali!"})
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = tokenDecode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"})
    }
}
 export default authMiddleware;