import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const LogoutUser = () => {
    if (window.confirm("You wanna logout?")) {
      localStorage.clear();
      window.location.href = "/login";
    } else {
      window.location.href = "/recipes";
    }
  };

  const auth = localStorage.getItem("token");

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed w-full z-10 top-0 transition-colors duration-300 ${
        isScrolled
          ? "bg-blue-500 backdrop-blur-md bg-opacity-60"
          : "bg-blue-500"
      }`}
    >
      <nav className="flex justify-between items-center p-4">
        <div className="flex items-center space-x-4">
          <Link to="/">
            <h2 className="text-white font-bold text-2xl">Chef's Choice</h2>
          </Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={handleToggleSidebar}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isSidebarOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              ></path>
            </svg>
          </button>
        </div>
        <div className="hidden md:block">
          <ul className="flex space-x-6 items-center">
            {auth ? (
              <>
                <li>
                  <NavLink
                    to="/recipes"
                    className="text-white font-medium text-lg"
                  >
                    Search recipes
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/addRecipe"
                    className="text-white font-medium text-lg"
                  >
                    Add Recipe
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    onClick={LogoutUser}
                    className="text-white font-medium text-lg"
                  >
                    Logout
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className="text-white text-lg font-medium"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/signup"
                    className="text-white text-lg font-medium"
                  >
                    SignUp
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/forgotPassword"
                    className="text-white text-lg font-medium"
                  >
                    Forgot Password
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-blue-500 text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-20`}
      >
        <div className="p-4">
          <button
            onClick={handleToggleSidebar}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <ul className="p-4 space-y-4">
          {auth ? (
            <>
              <li>
                <NavLink
                  to="/recipes"
                  onClick={handleToggleSidebar}
                  className="text-white text-lg"
                >
                  Recipes
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/addRecipe"
                  onClick={handleToggleSidebar}
                  className="text-white text-lg"
                >
                  Add Recipe
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  onClick={LogoutUser}
                  className="text-white text-lg"
                >
                  Logout
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/login"
                  onClick={handleToggleSidebar}
                  className="text-white text-lg"
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/signup"
                  onClick={handleToggleSidebar}
                  className="text-white text-lg"
                >
                  SignUp
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/forgotPassword"
                  onClick={handleToggleSidebar}
                  className="text-white text-lg"
                >
                  Forgot Password
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={handleToggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Navbar;
