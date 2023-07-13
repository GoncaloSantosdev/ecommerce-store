import { useState, useEffect } from "react";
// React Router
import { useNavigate } from "react-router-dom";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../redux/slices/cartSlice";
// Components
import { CheckoutSteps } from "../components";

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <section>
      <div className="container mx-auto px-6 mt-12 flex flex-col items-center">
        <CheckoutSteps step1 step2 step3 />
        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-slate-900 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
              Payment Method
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
              <div className="form-group">
                <label
                  className="block mb-2 text-white"
                  htmlFor="paymentMethod"
                >
                  Select Method
                </label>
                <div>
                  <label className="inline-flex items-center mt-3">
                    <input
                      className="mr-2"
                      type="radio"
                      id="PayPal"
                      name="paymentMethod"
                      value="PayPal"
                      defaultChecked
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="text-white">PayPal or Credit Card</span>
                  </label>
                </div>
              </div>
              <button type="submit" className="btn-primary">
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentScreen;
