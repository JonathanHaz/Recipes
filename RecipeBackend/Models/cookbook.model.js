const mongoose = require("mongoose");

const cookBookSchema = new mongoose.Schema(
    {
     userId: { type: mongoose.Types.ObjectId, ref: "Users" },
     name:{ type: String},
     recipes:[{
        recipeId: { type: mongoose.Types.ObjectId, ref: "Recipes" },
     }],
     price:{type:String},
     imgURL:{type:String, default: "https://m.media-amazon.com/images/I/81RX2NcvAuL._AC_UF1000,1000_QL80_.jpg"}
});

const Cookbook = mongoose.model("Cookbooks", cookBookSchema);

module.exports = {Cookbook};
