/* eslint-disable react/prop-types */
// React Router
import { Link } from "react-router-dom";
// Components
import { Rating } from ".";

const ProductCard = ({ product }) => {
  return (
    <div className="w-full max-w-sm border rounded-lg shadow bg-slate-900 border-slate-900">
      <Link to={`/product/${product._id}`}>
        <img
          className="p-8 rounded-t-lg"
          src={product.image}
          alt={product.name}
        />
      </Link>
      <div className="px-5 pb-5">
        <Link to={`/product/${product._id}`}>
          <h5 className="text-xl font-semibold tracking-tight  text-white truncate">
            {product.name}
          </h5>
        </Link>
        <div className="flex items-center mt-2.5 mb-5">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-white">
            ${product.price}
          </span>
          <Link to={`/product/${product._id}`} className="btn-primary">
            View More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
