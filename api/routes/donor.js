let express = require("express");
let Bcrypt = require("bcryptjs");
let validator = require("joi");
var nodemailer = require('nodemailer');
let router = express.Router();
router.use(express.json());


//Mail Server
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'erbil.blood.bank@gmail.com',
        pass: 'Erbil2019'
    }
});

//Collections Section
let { DonorClass, validationSchema } = require("../models/donor");
let { LaboratoryClass } = require("../models/laboratory");


//Insert new Donor
router.post("/register", async (req, res) => {
    const resultOfValidator = validator.validate(req.body, validationSchema);

    if (resultOfValidator.error) {
        res.status(400).send({ message: resultOfValidator.error.details[0].message });
    } else {
        var user = await DonorClass.findOne({ username: req.body.username });
        if (user) {
            return res.status(409).send({ message: "That username is taken. Try another" });
        } else {
            var password = Math.random().toString(36).slice(2);
            var mailOptions = {
                from: 'erbil.blood.bank@gmail.com',
                to: req.body.email,
                subject: 'Email From Erbil Blood Bank',
                text: `Your Password is: ${password} <br> please set new password here 
                http://localhost:3000/donor/reset `
            };

            transporter.sendMail(mailOptions, function (err, info) {
                if (err)
                    console.log(err)
                else
                    console.log("Email Sent");
            });

            password = Bcrypt.hashSync(password, Bcrypt.genSaltSync(10));
            const newDonor = new DonorClass({
                username: req.body.username,
                password: password,
                fullname: req.body.fullname,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                location: req.body.location,
                birthdate: req.body.birthdate,
                IDNumber: req.body.IDNumber,
                gender: req.body.gender,
                latestDateofDonation: null,
                bloodType: req.body.bloodType,
                laboratory: null,
                employer: req.user._id,
                role: "donor"
            });
            await newDonor.save();
            res.status(201).json({ message: "Donor Inserted Successfully." });
        }
    }
});

//Show donors 
router.get("/shows", async (req, res) => {
    const result = await DonorClass.find({})
        .sort({ fullname: 1 })
        .select("-password")
        .populate("employer", "-_id fullname")
        .populate('laboratory', "-donor")
        .populate('latestDonation', "-_id createdAt employer");
    if (result.length === 0) {
        res.status(404).json({ message: "Donor ID does not exist." });
    }
    res.status(200).json(result);
});

//Show specific donor 
router.get("/shows/:username", async (req, res) => {
    var user = await DonorClass.find({ username: req.params.username })
        .sort({ fullname: 1 })
        .select("-password")
        .populate("employer", "-_id fullname")
        .populate('laboratory', "-donor");;
    if (user.length === 0) {
        res.status(404).json({ message: "There is noone with this username" });
    }
    res.status(202).json(user);
});

//Delete a donor  
router.delete("/deactive", async (req, res) => {
    if (!(req.user.role === "donor")) {
        res.status(404).json({ message: "your are not donor to remove yourself" });
    }
    await DonorClass.findByIdAndUpdate({ _id: req.user._id }, { isActive: false });
    res.status(200).json({ message: "Deleted Successfully." });
});


//Donor login 
router.post("/login", async (req, res) => {
    try {
        var user = await DonorClass.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).json({ message: "User ID does not exist" });
        }
        if (user.isActive === false) {
            return res.status(400).json({ message: "User is Deleted can not log in" });
        }
        if (!Bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(400).send({ message: "Password is invalid" });
        }
        const token = user.generateAuthToken();
        res.status(202).header("x-auth-token", token).json({ message: "Correct!" });
    } catch (error) {
        res.status(500).send(error);
    }
});

//Donor Profile
router.get("/account", async (req, res) => {
    const user = await DonorClass.findById({ _id: req.user._id }).select("-password");
    res.status(202).json(user);
});


//Reset password of donor
router.put("/reset", async (req, res) => {
    await DonorClass.find({ _id: req.user._id });
    var newPassword = req.body.newPassword;
    var confirmNewPassword = req.body.confirmNewPassword;
    const validationSchema = {
        newPassword: validator.string().required().min(7),
        confirmNewPassword: validator.string().required().min(7)
    };
    const resultOfValidator = validator.validate(req.body, validationSchema);

    if (resultOfValidator.error)
        return res.status(400).send({
            message: resultOfValidator.error.details[0].message
        });

    if (newPassword !== confirmNewPassword) {
        res.json({ message: "Password does not match" });
    } else {
        newPassword = Bcrypt.hashSync(newPassword, Bcrypt.genSaltSync(10));
        await DonorClass.findByIdAndUpdate({ _id: req.user._id }, { password: newPassword });
        res.status(200).json({
            message: "Your Password Updated Succesfully"
        });
    }
});

//Search By username, age, gender, bloodType, and location
router.get("/search", async (req, res) => {
    var username = req.query.username;
    var gender = req.query.gender;
    var bloodType = req.query.bloodType;
    var location = req.query.location;

    const result = await DonorClass.find({})
        .or({ username: username })
        .or({ gender: gender })
        .or({ bloodType: bloodType })
        .or({ location: location })
        .sort({ fullname: 1 })
        .select("-password")
        .populate("employer", "-_id fullname")
        .populate('laboratory', "-donor");;

    if (result.length === 0) {
        res.status(404).json({ message: "User ID does not exist" });
    }
    res.status(202).json(result);
});

module.exports = router;