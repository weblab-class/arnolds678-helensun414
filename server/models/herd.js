const mongoose = require('mongoose');

const herdSchema = new mongoose.Schema({
    creator_id: String,
    creator_name: String,
    content: String,
});

module.exports = mongoose.model('herd', herdSchema);