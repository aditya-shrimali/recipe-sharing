import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddRecipe = () => {
  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: [""],
    instructions: "",
    imageUrl: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipe({
      ...recipe,
      [name]: value,
    });
  };

  const handleAddIngredient = () => {
    const lastIngredient = recipe.ingredients[recipe.ingredients.length - 1];
    if (lastIngredient !== "") {
      setRecipe({
        ...recipe,
        ingredients: [...recipe.ingredients, ""],
      });
    }
  };

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...recipe.ingredients];
    updatedIngredients[index] = value;
    setRecipe({
      ...recipe,
      ingredients: updatedIngredients,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nonEmptyIngredients = recipe.ingredients.filter(
      (ingredient) => ingredient.trim() !== ""
    );

    if (nonEmptyIngredients.length === 0) {
      toast.warn("Please provide at least one non-empty ingredient.");
      return;
    }

    try {
      const response = await fetch(
        "https://server-ivym.onrender.com/auth/recipe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(recipe),
        }
      );

      if (response.ok) {
        toast.success("Recipe added successfully");

        setTimeout(() => {
          window.location.href = "/recipes";
        }, 4000);
      } else {
        toast.error("Failed to add recipe:", response.status);
      }
    } catch (error) {
      toast.error("An error occurred while adding the recipe:", error);
    }
  };

  return (
    <div className="container mx-auto p-9 mt-10 ">
      <div className="max-w-xl mx-auto bg-white p-3 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
          Add Recipe
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={recipe.title}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="ingredients"
              className="block text-sm font-medium text-gray-700"
            >
              Ingredients:
            </label>
            {recipe.ingredients.map((ingredient, index) => (
              <input
                type="text"
                key={index}
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md mb-2"
              />
            ))}
            <button
              type="button"
              onClick={handleAddIngredient}
              className="bg-blue-500 text-white py-1 px-3 rounded-md mt-2 hover:bg-blue-600 transition duration-300"
            >
              Add Ingredient
            </button>
          </div>
          <div className="mb-3">
            <label
              htmlFor="instructions"
              className="block text-sm font-medium text-gray-700"
            >
              Instructions:
            </label>
            <textarea
              id="instructions"
              name="instructions"
              value={recipe.instructions}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              rows="3"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-gray-700"
            >
              Image URL:
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={recipe.imageUrl}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Add Recipe
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddRecipe;
