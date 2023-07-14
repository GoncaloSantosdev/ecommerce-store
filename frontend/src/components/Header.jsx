import { useState } from "react";
// React Router
import { Link, useNavigate } from "react-router-dom";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useLogoutMutation } from "../redux/slices/usersApiSlice";
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
        <div>
          <Link to={"/"}>
            <FaAppStore size={32} className="text-blue-700 cursor-pointer" />
          </Link>
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
          <div className="flex items-center" onClick={closeMenu}>
            <AiOutlineShoppingCart />
            <Link to={"/cart"}>Cart</Link>
            {cartItems.length > 0 && (
              <span className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2" onClick={closeMenu}>
            {userInfo ? (
              <>
                <AiOutlineUser />
                <Link to={"/profile"}>{userInfo.name}</Link>

                <AiOutlineLogout />
                <Link to={"/"} onClick={logoutHandler}>
                  Logout
                </Link>
              </>
            ) : (
              <>
                <AiOutlineLogin />
                <Link to={"/login"}>Login</Link>
              </>
            )}

            {userInfo && userInfo.isAdmin && (
              <div>
                <Link to={"admin/productlist"}>Products</Link>
                <Link to={"admin/userlist"}>Users</Link>
                <Link to={"admin/orderlist"}>Orders</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
