const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
    lastestMessage: { type: String ,ref: "Message"},
    isGroupChat: { type: Boolean, default: false } 
}, { timestamps: true });

module.exports = mongoose.model("Chat", conversationSchema);

