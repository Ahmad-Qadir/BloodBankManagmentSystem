var mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');
var validator = require('joi');

const donorSchema = new mongoose.Schema({
    username: String,
    password: String,
    fullname: String,
    email: String,
    phoneNumber: String,
    location: { type: String, enum: ["Erbil", "Duhok", "Sulemani", "Kerkuk", "Soran", "Koya", "Halabja"] },
    birthdate: Date,
    IDNumber: String,
    gender: { type: String, enum: ["Male", "Female"] },
    bloodType: { type: String, enum: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"] },
    laboratory: { type: mongoose.Schema.Types.ObjectId, ref: 'Laboratory' },
    latestDonation: { type: mongoose.Schema.Types.ObjectId, ref: 'Donation' },
    employer: { type: mongoose.Schema.Types.ObjectId, ref: 'Employeers' },
    isActive: { type: Boolean, default: true },
    donateTime: Number,
    role: String
}, {
        timestamps: true,
    });

//custom method to generate authToken 
donorSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, role: this.role, isActive: this.isActive, username: this.username }, config.get("myprivatekey"));
    return token;
}

//validation schema
const validationSchema = {
    username: validator.string().required().lowercase().alphanum().min(3),
    fullname: validator.string().required().regex(/([A-Z][a-z]{3,} )([A-Z][a-z]{3,} )([A-Z][a-z]{3,})/),
    email: validator.string().email().required(),
    phoneNumber: validator.string().required().regex(/^\d{4}\d{7}$/),
    location: validator.required(),
    IDNumber: validator.string().alphanum().required(),
    gender: validator.required().valid(["Male", "Female"]),
    bloodType: validator.required(),
}

const DonorClass = mongoose.model('Donors', donorSchema);

exports.DonorClass = DonorClass;
exports.validationSchema = validationSchema;