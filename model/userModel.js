const mongoose = require('mongoose')
let dbLink = `mongodb+srv://bharath:bharath@cluster0.d9hbewb.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(dbLink).then(function () {
    console.log("db connected");
}).catch(function (err) {
    console.log("error", err);
})

//schema

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is missing"]
    },
    age: {
        type: Number,
        required: [true, "age is missing"]
    },
    hobbies: {
        type: [String],
        required: [true, "hobbies is missing"]
    },

})

const userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;