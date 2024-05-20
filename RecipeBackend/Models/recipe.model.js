const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema(
    {
        userId: {type: mongoose.Types.ObjectId, ref: "Users" },
        name:{type:String, required: true},
        desc:{type:String, required: true},
        
        ingredients:[{
            name: {type:String, required: true},
            measurement: {type:String, required: true},
            quantity: {type:Number, default: 1, required: true}
        }],
        instructions:[{
            step:{type:Number, required: true},
            instruction:{type:String, required: true}
        }],
        category: [{ type: String, required: true }],
        cookTime:{type:String, required: true},
        imgURL:{type:String},
        
    }
)

const Recipe = mongoose.model("Recipes", recipeSchema);

module.exports = { Recipe }
