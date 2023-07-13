import { useEffect } from "react";
// React Router
import { Link, useNavigate } from "react-router-dom";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { useCreateOrderMutation } from "../redux/slices/ordersApiSlice";
import { clearCartItems } from "../redux/slices/cartSlice";
// Components
import { CheckoutSteps, Spinner, Message } from "../components";
// Toast
import { toast } from "react-toastify";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();
  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <section>
      <div className="container mx-auto px-6 mt-12">
        <CheckoutSteps step1 step2 step3 step4 />
        <div>
          <div className="bg-slate-900 text-white rounded px-4 md:px-6 py-8 shadow mt-4">
            <p>
              <span className="font-bold">Address: </span>
              {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
              {cart.shippingAddress.postalCode} , {cart.shippingAddress.country}
            </p>
            <p className="mt-4">
              <span className="font-bold">Payment Method: </span>
              {cart.paymentMethod}
            </p>

            <div className="mt-4">
              <span className="font-bold">Order Items: </span>
              {cart.cartItems.length === 0 ? (
                <Message variant="danger">Your cart is empty</Message>
              ) : (
                <div>
                  <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-slate-800 text-gray-200 mt-4">
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
                            Qty / Price
                          </th>
                        </tr>
                      </thead>
                      {cart.cartItems.map((item, index) => (
                        <tbody key={index}>
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
                              <Link to={`/product/${item._id}`}>
                                {item.name}
                              </Link>
                            </td>
                            <td className="px-6 py-4 font-semibold text-white">
                              {item.qty} x ${item.price} = $
                              {item.qty * item.price}
                            </td>
                          </tr>
                        </tbody>
                      ))}
                    </table>
                  </div>
                  <div className="flex flex-col mt-6 space-y-4 md:flex-row md:space-y-0 justify-between">
                    <div>
                      <span className="font-bold">Items:</span> $
                      {cart.itemsPrice}
                    </div>
                    <div>
                      <span className="font-bold">Shipping:</span> $
                      {cart.shippingPrice}
                    </div>
                    <div>
                      <span className="font-bold">Tax:</span> ${cart.taxPrice}
                    </div>
                    <div>
                      <span className="font-bold">Total:</span> $
                      {cart.totalPrice}
                    </div>
                  </div>

                  <div>
                    {error && <Message variant="danger">{error}</Message>}
                  </div>

                  <div className="mt-6">
                    <button
                      className="btn-primary"
                      type="button"
                      disabled={cart.cartItems.length === 0}
                      onClick={placeOrderHandler}
                    >
                      Place Order
                    </button>

                    {isLoading && <Spinner />}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlaceOrderScreen;
