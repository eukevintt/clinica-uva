const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const privateRoutes = require("./routes/privateRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// app.get("/health", (req, res) => {
//     return res.status(200).json({
//         status: "ok",
//         message: "API da clínica funcionando"
//     });
// });

app.get("/health", (req, res) => {
    return res.status(200).json({
        status: "ok",
        hasMongoUri: !!process.env.MONGODB_URI
    });
});

app.use("/auth", authRoutes);
app.use("/api", privateRoutes);
app.use("/appointments", appointmentRoutes);

module.exports = app;