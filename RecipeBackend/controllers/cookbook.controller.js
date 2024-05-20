const { User} = require('../Models/user.model')
const {Cookbook} = require('../Models/cookbook.model')

const getCookBooks = async (req, res) => {
    const cookBook = await Cookbook.find({}).populate("recipes.recipeId").populate("userId")
    res.send(cookBook);
  };

  const getCookBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const cookBook = await Cookbook.findById(id).populate("recipes.recipeId");
        if (!cookBook) {
            return res.status(404).send("Cookbook not found");
        }
        res.send(cookBook);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = { getCookBookById };

  const getCookBooksByUserId = async (req, res) => {
    const userId = req.params.userId;
    try {
        const cookbook = await Cookbook.find({ userId });
        if (!cookbook) {
            return res.status(404).send("cookbook not found for this user");
        }
        res.send(cookbook);
    } catch (error) {
        console.error("Error getting cookbook by userId:", error);
        res.status(500).send("Failed to get cookbook by userId");
    }
}

  const updateCookBook = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
      const update = await Cookbook.findByIdAndUpdate(id, body, {
        new: true,
      });
      return res.send(update);
    } catch (error) {
      res.status(400).send("Error");
    }
  };

  const deleteCookBook = async (req, res) => {
    const { id } = req.params;
    try {
      const isDeleted = await Cookbook.findByIdAndDelete(id);
      return res.send("ID deleted");
    } catch (error) {
      res.status(400).send("Error");
    }
  };

  const createCookBook = async (req, res) => {
    const body = req.body;
    try {
      body.userId = req.user.id;
      const cookBook = await new Cookbook(body);
      await cookBook.save();
      res.send({ message: "added", data: body });
      await User.findByIdAndUpdate(
        req.user.id,
        { $push: { CookbookId: cookBook._id } },
        { new: true }
      );
    } catch (error) {
      console.log(error);
      res.status(400).send("Error");
    }
  };
  

  const addRecipe = async (req, res) => {
    const { cookBookId, recipeId } = req.body;
    try {
        const cookBook = await Cookbook.findById(cookBookId);
        if (!cookBook) {
            return res.status(404).send("Cookbook not found");
        }
        const newRecipe = {
            recipeId: recipeId
        };
        cookBook.recipes.push(newRecipe);
        await cookBook.save();
        res.status(200).send("Recipe added to cookbook successfully");
    } catch (err) {
        console.error(err);
        res.status(400).send("Cannot add recipe, bad request");
    }
};




  module.exports = {getCookBooks, getCookBookById, createCookBook, updateCookBook, deleteCookBook, addRecipe, getCookBooksByUserId }