const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema(
    {
        userId: {type: mongoose.Types.ObjectId, ref: "Users" },
        recipeId: {type: mongoose.Types.ObjectId, ref: "Recipes" },
        comment:{type:String},
        rating:{type:Number},

    }
)