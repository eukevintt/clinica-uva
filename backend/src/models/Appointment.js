const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
    {
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        date: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        cep: {
            type: String,
            required: true
        },
        street: {
            type: String,
            default: ""
        },
        neighborhood: {
            type: String,
            default: ""
        },
        city: {
            type: String,
            default: ""
        },
        state: {
            type: String,
            default: ""
        },
        weatherAlert: {
            type: String,
            default: ""
        },
        status: {
            type: String,
            enum: ["scheduled", "completed", "canceled"],
            default: "scheduled"
        }
    },
    {
        timestamps: true
    }
);

appointmentSchema.index({ date: 1, time: 1 }, { unique: true });

module.exports = mongoose.model("Appointment", appointmentSchema);