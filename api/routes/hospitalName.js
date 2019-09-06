const express = require('express');
const app = express();
const joi = require('joi');
require('../connections/serverConnection');
var router = express.Router();
router.use(express.json());

//insert new hospitalName
router.post('/register', async (req, res) => {
    const ValidationLocation = {
        hospitalName: joi.string().required(),
    }

    const resulteValidation = joi.validate(req.body, ValidationLocation);

    if (resulteValidation.error) {
        res.status(404).send({
            message = resulteValidation.error.details[0].message,
        });
    } else {
        const newHospitalName = new hospitalClass({
            hospitalName: req.body.hospitalName
        })
        newLocation.save();
        res.status(201).json(newHospitalName)
    }
});

//update hospitalName
router.put('/update', async (req, res) => {
    var location = req.body.location,
    const validateSchema = {
        hospitalName: joi.string().required()
    }

    const resulteValidation = joi.validate(req.body, validateSchema);

    if (validateSchema.error)
        res.status(404).send({
            message: resulteValidation.error.details[0].message
        });

    await hospitalClass.findByIdAndUpdate({ _id: req.body.params.id }, {
        $set: {
            hospitalName: hospitalName,
        }
    }, { new: true });
    res.json({
        message: "your information Update Succesfully"
    });
});

//delete hospitalName
route.delete('/delete/:id', async (req, res) => {
    const resulte = await hospitalClass.delete({ _id: req.params.id });
    if (resulte.length === 0) {
        res.status(404).send({
            message: "this is no hospitalName by this id"
        })
    }
    res.status(202).json(resulte)
})
module.exports = router;