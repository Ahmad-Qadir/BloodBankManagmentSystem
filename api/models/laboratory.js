var mongoose = require('mongoose');

const labSchema = new mongoose.Schema({
    weight: Number,
    bloodPreasure: String,
    pulserate: String,
    heart: String,
    chest: String,
    temp: String,
    plt: String,
    hct: String,
    rh: Boolean,
    hv: String,
    temp: String,
    syphilis: Boolean,
    hbc: Boolean,
    hiv: Boolean,
    hcv: Boolean,
    hbs: Boolean,
    donor: { type: mongoose.Schema.Types.ObjectId, ref: "Donors" },
    employer: { type: mongoose.Schema.Types.ObjectId, ref: "Employeers" },
}, {
        timestamps: true
    });


const LaboratoryClass = mongoose.model('Laboratory', labSchema);

exports.LaboratoryClass = LaboratoryClass;