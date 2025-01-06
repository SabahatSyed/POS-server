const mongoose = require('mongoose');


const companySchema = new mongoose.Schema({
    seqNumber: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    logoURL: {
        type: String
    },
    pagesAccess: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Page'
    }],
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Inactive'
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    companyType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyType',
        required: true
    },
    theme: {
        type: String
    },
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);