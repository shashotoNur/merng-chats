const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatMessageSchema = new Schema(
    {
        id: String,
        threadId: String,
        sender: String,
        msgTxt: String,
        time: { type: Date, default: Date.now }
    });

module.exports = mongoose.model('ChatMessage', chatMessageSchema);