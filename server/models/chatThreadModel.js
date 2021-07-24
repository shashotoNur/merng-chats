const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatThreadSchema = new Schema(
    {
        id: String,
        users: [String],
        chatMessageIds: Array
    });

module.exports = mongoose.model('ChatThread', chatThreadSchema);