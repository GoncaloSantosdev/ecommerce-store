import { useState } from "react";
// React Router
import { Link, useNavigate } from "react-router-dom";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useLogoutMutation } from "../redux/slices/usersApiSlice";
// Components
import SearchBox from "./SearchBox";
// React Icons
import { FaAppStore } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";
import {
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMenu = () => {
    setMenu(!menu);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link to={"/"}>
            <FaAppStore size={32} className="text-blue-700 cursor-pointer" />
          </Link>
          <SearchBox />
        </div>
        <div className="cursor-pointer md:hidden" onClick={handleMenu}>
          {menu ? <IoCloseOutline size={18} /> : <HiOutlineMenu size={18} />}
        </div>
        <div
          className={
            menu
              ? "absolute top-[5rem] right-[1.5rem] p-4 rounded bg-white shadow z-50 scale-up-center md:hidden space-y-4"
              : "hidden md:flex md:space-x-6"
          }
        >
          {userInfo ? (
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2" onClick={closeMenu}>
                <AiOutlineShoppingCart />
                <Link to={"/cart"}>Cart</Link>
                {cartItems.length > 0 && (
                  <span className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                  </span>
                )}
              </div>
              <div>
                <button
                  id="dropdownDefaultButton"
                  onClick={toggleDropdown}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                  type="button"
                >
                  {userInfo.name}{" "}
                  <svg
                    className="w-2.5 h-2.5 ml-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                {/* Dropdown menu */}
                <div
                  id="dropdown"
                  className={`${
                    isDropdownOpen ? "block absolute" : "hidden"
                  } z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}
                >
                  <ul
                    className="py-2 text-sm text-gray-700"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    <li>
                      <Link
                        to={"/profile"}
                        className="block px-4 py-2 hover:bg-gray-100 border-b"
                      >
                        Profile
                      </Link>
                    </li>
                    {userInfo.isAdmin && (
                      <>
                        <li>
                          <Link
                            to={"admin/productlist"}
                            className="block px-4 py-2 hover:bg-gray-100 border-b"
                          >
                            Products
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"admin/userlist"}
                            className="block px-4 py-2 hover:bg-gray-100 border-b"
                          >
                            Users
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"admin/orderlist"}
                            className="block px-4 py-2 hover:bg-gray-100 border-b"
                          >
                            Orders
                          </Link>
                        </li>
                      </>
                    )}
                    <li>
                      <Link
                        to={"/"}
                        onClick={logoutHandler}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2" onClick={closeMenu}>
                <AiOutlineShoppingCart />
                <Link to={"/cart"}>Cart</Link>
                {cartItems.length > 0 && (
                  <span className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <AiOutlineLogin />
                <Link to={"/login"}>Login</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
