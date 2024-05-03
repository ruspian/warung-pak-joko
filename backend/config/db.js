import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb://localhost:27017/pak-joko"
    )
    .then(() => {
      console.log("DB Connected");
    });
};

