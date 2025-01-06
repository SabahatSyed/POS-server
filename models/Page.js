const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
    seqNumber: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    companyType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyType',
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Page', pageSchema);