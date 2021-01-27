const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
    userId: String,
    creator_id: String,
    creator_name: String,
    content: String,
    parent: String,
});

module.exports = mongoose.model('achievement', achievementSchema);