/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="flex space-x-6 mb-12 justify-center">
      <div>
        {step1 ? (
          <Link to={"/login"}>Sign In</Link>
        ) : (
          <Link disabled className="text-gray-500">
            Sign In
          </Link>
        )}
      </div>
      <div>
        {step2 ? (
          <Link to={"/shipping"}>Shipping</Link>
        ) : (
          <Link disabled className="text-gray-500">
            Shipping
          </Link>
        )}
      </div>
      <div>
        {step3 ? (
          <Link to={"/payment"}>Payment</Link>
        ) : (
          <Link disabled className="text-gray-500">
            Payment
          </Link>
        )}
      </div>
      <div>
        {step4 ? (
          <Link to={"/placeorder"}>Place Order</Link>
        ) : (
          <Link disabled className="text-gray-500">
            Place Order
          </Link>
        )}
      </div>
    </div>
  );
};

export default CheckoutSteps;
