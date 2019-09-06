let config = require("config");
let express = require('express');
let mongoose = require('mongoose');
require('express-async-errors');
let CORS = require('cors');
let app = express();
app.use(CORS());
app.use(express.json());
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);

//Connecting Database Section
mongoose.connect(config.get("MongoDB_URL"))
    .then(() => { console.log("Connected to Database") })
    .catch((err) => { console.log("Could not connect to Database", err) });

//End Points Path
app.use('/donor', require('./routes/donor'));
app.use('/laboratory', require("./routes/laboratory"));

if (!config.get("myprivatekey") || !config.get("MongoDB_URL")) {
    console.error("FATAL ERROR: PrivateKey or Connection link is not defined.");
    process.exit(1);
}

app.get('/', (req, res) => {
    res.send("yes its working");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("App Listning to http://localhost:3000");
});