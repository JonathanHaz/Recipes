const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        id: {type: String},
        username: {type: String, required:true},
        firstName:{type: String},
        lastName:{type: String},
        email:{type: String, required:true},
        password:{type: String, required:true},
            role:{
            type: String,
            enum:["user","chef","admin"],
            default:"user"},
        imageUrl: {type:String ,default:"https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png"},
    }
)

const User = mongoose.model("Users", userSchema);

module.exports = { User }
