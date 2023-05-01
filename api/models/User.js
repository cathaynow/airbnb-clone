import mongoose from "mongoose";
import validator from "validator";
// import bcryptjs from "bcryptjs";
// import jwt from "jsonwebtoken";

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String },
    email: {
      type: String,
      unique: true,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: "이메일 형태로 입력해주세요",
      },
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// UserSchema.pre("save", async function () {
//   const salt = await bcryptjs.genSalt(10);
//   this.password = await bcryptjs.hash(this.password, salt);
// });

// UserSchema.methods.createJWT = function () {
//   return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_LIFETIME,
//   });
// };

// UserSchema.methods.comparePwd = async function (candidate) {
//   const isMatch = await bcryptjs.compare(candidate, this.password);
//   return isMatch;
// };

export default mongoose.model("User", UserSchema);
