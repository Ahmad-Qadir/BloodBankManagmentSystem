let express = require("express");
let router = express.Router();
router.use(express.json());

//Collections Section
let { DonorClass } = require("../models/donor");
let { LaboratoryClass } = require("../models/laboratory");

//Insert new test
router.post("/register", async (req, res) => {
    var donorCheck = await DonorClass.findOne({ _id: req.body.id }).exec();
    if (!donorCheck) {
        return res.status(409).json({ message: "The donor does not exist" });
    }
    const newTest = new LaboratoryClass({
        hiv: true,
        employer: req.user._id,
        donor: req.body.id
    });
    await newTest.save();
    await DonorClass.findByIdAndUpdate({ _id: req.body.id }, {
        $set: { laboratory: newTest._id, latestDateofDonation: newTest.testDate }
    }, { new: true });

    res.status(201).json(newTest);

});

//Show donors 
router.get("/shows", async (req, res) => {
    const result = await LaboratoryClass.find({})
        .populate("donor", "-_id name");
    if (result.length === 0) {
        res.status(204).json({ message: "You Dont have any donor" });
    }
    res.status(202).json(result);
});


module.exports = router;