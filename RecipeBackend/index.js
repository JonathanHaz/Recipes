const { app } = require("./app");
const {config} = require('./config')
const mongoose = require('mongoose');



mongoose.connect(config.MONGO_URL)
    .then(() => {
        console.log("Connected to mongoDB");
    }).catch(error => {
        console.log(error);
    });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


