// React Router
import { Link, useNavigate } from "react-router-dom";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/slices/cartSlice";
// Components
import { Message } from "../components";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <section>
      <div className="container mx-auto px-6 mt-12">
        <h2 className="text-center text-2xl md:text-3xl md:text-left">
          Your <span className="text-blue-700">Shopping</span> Cart
        </h2>

        {cartItems.length === 0 ? (
          <div className="mt-8">
            <Message variant="danger">
              <div className="flex justify-between w-full">
                Your cart is empty!
                <Link to={"/"} className="text-black underline">
                  Go Back
                </Link>
              </div>
            </Message>
          </div>
        ) : (
          <div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-slate-800 text-gray-200 mt-12">
              <table className="w-full text-sm text-left text-gray-400">
                <thead className="text-xs uppercase text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Image</span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Qty
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                {cartItems.map((item) => (
                  <tbody key={item._id}>
                    <tr className="bg-slate-900 border-b border-gray-700 hover:bg-gray-800">
                      <td className="w-32 p-4">
                        <Link to={`/product/${item._id}`}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="rounded"
                          />
                        </Link>
                      </td>
                      <td className="px-6 py-4 font-semibold text-white">
                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                      </td>
                      <td>
                        <select
                          id="countries"
                          className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                          value={item.qty}
                          onChange={(e) =>
                            addToCartHandler(item, Number(e.target.value))
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 font-semibold text-white">
                        ${item.price}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          type="submit"
                          className="font-medium text-red-500 hover:underline"
                          onClick={() => removeFromCartHandler(item._id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
            <div className="h-full rounded-lg border bg-white p-6 shadow-md mt-4 md:w-1/3">
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </p>
                <p className="text-gray-700">
                  $
                  {cartItems.reduce(
                    (acc, item) => acc + item.qty * item.price,
                    0
                  )}
                </p>
              </div>
              <button
                type="button"
                className="btn-primary w-full mt-4"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Check out
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartScreen;
