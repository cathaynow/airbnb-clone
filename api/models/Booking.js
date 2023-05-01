import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  place: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Place" },
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  myname: { type: String, required: true },
  guest: { type: Number },
  mobile: { type: String, required: true },
  price: { type: Number },
});

export default mongoose.model("Booking", bookingSchema);
