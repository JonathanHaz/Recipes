import React, { useState } from "react";
import { api } from "../../config/api";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import "./CreateRecipe.css";

export default function CreateRecipe() {
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cookingTime, setCookingTime] = useState("");
  const [cookingTimeUnit, setCookingTimeUnit] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);
  const [ImgData, setImgData] = useState({});


  const changeImgInfoHandler = (e) => {
    setImgData(e.target.files[0]);
  };
  
  const handleFile = async () => {
    try {
      const formData = new FormData();
      formData.append("recipeIMG", ImgData);
  
      const response = await fetch(`${api}/recipe/image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Failed to upload image");
      }
  
      console.log("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };


  const handleAddIngredient = () => {
    setIngredients([
      ...ingredients,
      { name: "", measurement: "", quantity: "" },
    ]);
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  const handleAddInstruction = () => {
    setInstructions([...instructions, { step: "", instruction: "" }]);
  };

  const handleRemoveInstruction = (index) => {
    const newInstructions = [...instructions];
    newInstructions.splice(index, 1);
    setInstructions(newInstructions);
  };

  const handleAddCategory = () => {
    setCategories([...categories, ""]);
  };

  const handleRemoveCategory = (index) => {
    const newCategories = [...categories];
    newCategories.splice(index, 1);
    setCategories(newCategories);
  };

  const handleIngredientChange = (index, key, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][key] = value;
    setIngredients(newIngredients);
  };

  const handleInstructionChange = (index, key, value) => {
    const newInstructions = [...instructions];
    newInstructions[index][key] = value;
    setInstructions(newInstructions);
  };

  const handleCategoryChange = (index, value) => {
    const newCategories = [...categories];
    newCategories[index] = value;
    setCategories(newCategories);
  };

  const handleInputFocus = (fieldName) => {
    setFocusedInput(fieldName);
  };

  const handleInputBlur = () => {
    setFocusedInput(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Upload the image first
      await handleFile();
  
      // Create the recipe
      const token = localStorage.getItem("token");
      const response = await fetch(`${api}/recipe/createRecipe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: recipeName,
          desc: description,
          ingredients: ingredients.filter(
            (ingredient) => ingredient.name !== ""
          ),
          instructions: instructions.filter(
            (instruction) => instruction.step !== ""
          ),
          category: categories.filter((category) => category !== ""),
          cookTime: cookingTime,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to create recipe");
      }
  
      setSuccessMessage("Recipe created successfully");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error creating recipe:", error);
      setErrorMessage("Failed to create recipe. Please try again later.");
    }
  };
  

  return (
    <div className="containerDivCreate">
      <img className="imgimg" src="src/assets/images/shapapa.png" alt="" />
      <div className="rootOfCreateRecipe">
        <h1 className="createTitle">Create Recipe</h1>
        {successMessage && <div>{successMessage}</div>}
        {errorMessage && <div>{errorMessage}</div>}
        <form className="formForCreateRecipe" onSubmit={handleSubmit}>
          <div className="formSection">
            <h2>Recipe Information</h2>
            <div className="spaceForInputs">
              <TextField
                className={`formControl ${
                  focusedInput === "recipeName" ? "input-focused" : ""
                }`}
                type="text"
                placeholder="Recipe Name"
                value={recipeName}
                onFocus={() => handleInputFocus("recipeName")}
                onBlur={handleInputBlur}
                onChange={(e) => setRecipeName(e.target.value)}
              />
              <TextField
                className={`formControl descInput ${
                  focusedInput === "description" ? "input-focused" : ""
                }`}
                type="text"
                placeholder="Description"
                value={description}
                onFocus={() => handleInputFocus("description")}
                onBlur={handleInputBlur}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="formSection">
            <h2>Ingredients:</h2>
            {ingredients.map((ingredient, index) => (
              <div key={index} className="formControl spaceForInputs">
                <TextField
                  type="text"
                  className={`ingredientInput ${
                    focusedInput === `ingredientName${index}`
                      ? "input-focused"
                      : ""
                  }`}
                  placeholder="Ingredient Name"
                  value={ingredient.name}
                  onFocus={() => handleInputFocus(`ingredientName${index}`)}
                  onBlur={handleInputBlur}
                  onChange={(e) =>
                    handleIngredientChange(index, "name", e.target.value)
                  }
                />
                <Select
                  value={ingredient.measurement}
                  className={`${
                    focusedInput === `ingredientMeasurement${index}`
                      ? "input-focused"
                      : ""
                  }`}
                  onFocus={() =>
                    handleInputFocus(`ingredientMeasurement${index}`)
                  }
                  onBlur={handleInputBlur}
                  onChange={(e) =>
                    handleIngredientChange(index, "measurement", e.target.value)
                  }
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Unit
                  </MenuItem>
                  <MenuItem value="cup">cup</MenuItem>
                  <MenuItem value="ml">ml</MenuItem>
                  <MenuItem value="L">L</MenuItem>
                  <MenuItem value="Tbsp">Tbsp</MenuItem>
                  <MenuItem value="g">g</MenuItem>
                  <MenuItem value="Kg">Kg</MenuItem>
                </Select>
                <TextField
                  type="text"
                  className={`quantityInput ${
                    focusedInput === `ingredientQuantity${index}`
                      ? "input-focused"
                      : ""
                  }`}
                  placeholder="Quantity"
                  value={ingredient.quantity}
                  onFocus={() => handleInputFocus(`ingredientQuantity${index}`)}
                  onBlur={handleInputBlur}
                  onChange={(e) =>
                    handleIngredientChange(index, "quantity", e.target.value)
                  }
                />
                <IconButton
                  className="removeButton"
                  aria-label="delete"
                  onClick={() => handleRemoveIngredient(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ))}
            <Fab
              className="addButton"
              color="primary"
              aria-label="add"
              onClick={handleAddIngredient}
            >
              <AddIcon />
            </Fab>
          </div>
          <div className="formSection">
            <h2>Instructions:</h2>
            {instructions.map((instruction, index) => (
              <div key={index} className="formControl spaceForInputs">
                <TextField
                  type="text"
                  className={`stepInput ${
                    focusedInput === `instructionStep${index}`
                      ? "input-focused"
                      : ""
                  }`}
                  placeholder="Step"
                  value={instruction.step}
                  onFocus={() => handleInputFocus(`instructionStep${index}`)}
                  onBlur={handleInputBlur}
                  onChange={(e) =>
                    handleInstructionChange(index, "step", e.target.value)
                  }
                />
                <TextField
                  type="text"
                  className={`instructionInput ${
                    focusedInput === `instructionText${index}`
                      ? "input-focused"
                      : ""
                  }`}
                  placeholder="Instruction"
                  value={instruction.instruction}
                  onFocus={() => handleInputFocus(`instructionText${index}`)}
                  onBlur={handleInputBlur}
                  onChange={(e) =>
                    handleInstructionChange(
                      index,
                      "instruction",
                      e.target.value
                    )
                  }
                />
                <IconButton
                  className="removeButton"
                  aria-label="delete"
                  onClick={() => handleRemoveInstruction(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ))}
            <Fab
              className="addButton"
              color="primary"
              aria-label="add"
              onClick={handleAddInstruction}
            >
              <AddIcon />
            </Fab>
          </div>
          <div className="formSection">
            <h2>Categories:</h2>
            {categories.map((category, index) => (
              <div key={index} className="formControl spaceForInputs">
                <TextField
                  type="text"
                  placeholder="Category"
                  value={category}
                  onFocus={() => handleInputFocus(`category${index}`)}
                  onBlur={handleInputBlur}
                  onChange={(e) => handleCategoryChange(index, e.target.value)}
                />
                <IconButton
                  className="removeButton"
                  aria-label="delete"
                  onClick={() => handleRemoveCategory(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ))}
            <Fab
              className="addButton"
              color="primary"
              aria-label="add"
              onClick={handleAddCategory}
            >
              <AddIcon />
            </Fab>
          </div>
          <div className="formSection spaceForInputs">
            <TextField
              className={`formControl ${
                focusedInput === "cookingTime" ? "input-focused" : ""
              }`}
              type="number"
              placeholder="Cooking Time"
              value={cookingTime}
              onFocus={() => handleInputFocus("cookingTime")}
              onBlur={handleInputBlur}
              onChange={(e) => setCookingTime(e.target.value)}
            />
            <Select
              className={`formControl ${
                focusedInput === "cookingTime" ? "input-focused" : ""
              }`}
              value={cookingTimeUnit}
              onChange={(e) => setCookingTimeUnit(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Unit
              </MenuItem>
              <MenuItem value="Minutes">Minutes</MenuItem>
              <MenuItem value="Hour">Hour</MenuItem>
              <MenuItem value="Day">Day</MenuItem>
            </Select>
            <TextField
              className={`formControl ${
                focusedInput === "imgURL" ? "input-focused" : ""
              }`}
              type="file"
              placeholder="Image URL"
              onChange={changeImgInfoHandler}
              onFocus={() => handleInputFocus("imgURL")}
              onBlur={handleInputBlur}
            />
          </div>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
