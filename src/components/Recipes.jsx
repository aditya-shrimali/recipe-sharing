import { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      getRecipes(token);
    } else {
      getPublicRecipes();
    }
  }, []);

  const getPublicRecipes = async () => {
    try {
      const response = await fetch(
        "https://server-ivym.onrender.com/auth/recipe/public"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch public recipes");
      }
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getRecipes = async (token) => {
    try {
      const response = await fetch(
        "https://server-ivym.onrender.com/auth/recipe",
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user recipes");
      }
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const searchRecipes = async (e) => {
    try {
      if (e.target.value) {
        const endpoint = isLoggedIn
          ? `https://server-ivym.onrender.com/auth/searchRecipes/${e.target.value}`
          : `https://server-ivym.onrender.com/searchRecipes/${e.target.value}`;
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(isLoggedIn && { Authorization: localStorage.getItem("token") }),
          },
        });

        const data = await response.json();

        if (!data.message) {
          setRecipes(data);
        } else {
          setRecipes([]);
        }
      } else {
        isLoggedIn
          ? getRecipes(localStorage.getItem("token"))
          : getPublicRecipes();
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-10 pt-20">
      <div className="flex justify-center mb-8 pt-4 sm:pt-10">
        <input
          type="text"
          className="border border-gray-200 p-3 rounded-lg w-full max-w-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
          placeholder="Search recipes"
          onChange={(e) => searchRecipes(e)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105"
            >
              <h2 className="text-xl font-bold mb-2 text-blue-600">
                {recipe.title}
              </h2>
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
              <h3 className="text-lg font-semibold text-blue-600">
                Ingredients:
              </h3>
              <ul className="list-disc list-inside">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
              <div className="mt-2">
                <h3 className="text-lg font-semibold text-blue-600">
                  Instructions:
                </h3>
                <ol className="list-decimal list-inside">
                  {recipe.instructions.split("\n").map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          ))
        ) : (
          <h2 className="text-center col-span-3 mx-auto mt-40 text-xl">
            <Circles
              height="80"
              width="80"
              color="#3182ce"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </h2>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Recipes;
