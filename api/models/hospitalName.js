var mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');

const hospitalSchema = new mongoose.Schema({
    hospitalName: String,
})


const hospitalClass = mongoose.model('hospitalName', hospitalSchema);

module.exports = hospitalClass;