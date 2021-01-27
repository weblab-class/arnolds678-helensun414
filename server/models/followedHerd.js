const mongoose = require('mongoose');

const followedHerdSchema = new mongoose.Schema({
    userId: String,
    creator_id: String,
    creator_name: String,
    content: String,
});

module.exports = mongoose.model('followedHerd', followedHerdSchema);