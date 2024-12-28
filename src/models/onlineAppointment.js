const mongoose = require("mongoose");
const { v4 } = require("uuid");

const zoomMeetingSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: v4,
    },
    userId: {
        type: String,
        required: true,
    },
    lawyerId: {
        type: String,
        required: true,
    },
    topic: {
        type: String,
    },
    startTime: {
        type: String,
    },
    duration: {
        type: Number,
    },
    joinUrl: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    slot: {
        type: String,
    },
    date: {
        type: String,
    },
    status: {
        type: String,
        default: "Pending",
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: Number,
        required: true,
    },
    payment: {
        type: String,

    },
}, {
    timestamps: true,
});

const ZoomMeeting = mongoose.model("ZoomMeeting", zoomMeetingSchema);

module.exports = ZoomMeeting;