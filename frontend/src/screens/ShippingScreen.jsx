import { useState } from "react";
// React Router
import { useNavigate } from "react-router-dom";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../redux/slices/cartSlice";
// Components
import { CheckoutSteps } from "../components";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <section>
      <div className="container mx-auto px-6 mt-12 flex flex-col items-center">
        <CheckoutSteps step1 step2 />
        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-slate-900 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
              Shipping
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium  text-white"
                >
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your address"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block mb-2 text-sm font-medium  text-white"
                >
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your city"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="postalCode"
                  className="block mb-2 text-sm font-medium  text-white"
                >
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your postal code"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="country"
                  className="block mb-2 text-sm font-medium  text-white"
                >
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your country"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn-primary"
                onClick={submitHandler}
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShippingScreen;
