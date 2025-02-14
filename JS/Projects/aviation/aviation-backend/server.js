const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc"); // Replace with your Stripe key
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/aviation-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User Schema
const UserSchema = new mongoose.Schema({
  role: { type: String, enum: ["student", "instructor"], required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);

// Booking Schema
const BookingSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  instructor_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date_time: { type: Date, required: true },
  status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
  payment_status: { type: String, enum: ["paid", "unpaid"], default: "unpaid" },
});

const Booking = mongoose.model("Booking", BookingSchema);

// Register Endpoint
app.post("/api/auth/register", async (req, res) => {
  const { role, name, email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({ role, name, email, password_hash: passwordHash });
  await user.save();
  res.status(201).json({ message: "User registered" });
});

// Login Endpoint
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await bcrypt.compare(password, user.password_hash)) {
    const token = jwt.sign({ id: user._id, role: user.role }, "secret_key");
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Create Booking Endpoint
app.post("/api/bookings", async (req, res) => {
  const { student_id, instructor_id, date_time } = req.body;
  const booking = new Booking({ student_id, instructor_id, date_time });
  await booking.save();
  res.status(201).json({ message: "Booking created", booking });
});

// Get Bookings for Student
app.get("/api/students/:id/bookings", async (req, res) => {
  const bookings = await Booking.find({ student_id: req.params.id }).populate("instructor_id");
  res.json(bookings);
});

// Get Bookings for Instructor
app.get("/api/instructors/:id/bookings", async (req, res) => {
  const bookings = await Booking.find({ instructor_id: req.params.id }).populate("student_id");
  res.json(bookings);
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));