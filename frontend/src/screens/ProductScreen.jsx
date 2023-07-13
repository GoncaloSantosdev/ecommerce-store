import { useState } from "react";
// React Router
import { Link, useParams } from "react-router-dom";
// Redux
import { useDispatch } from "react-redux";
import { useGetProductDetailsQuery } from "../redux/slices/productsApiSlice";
import { addToCart } from "../redux/slices/cartSlice";
// Components
import { Message, Rating, Spinner } from "../components";

const ProductScreen = () => {
  const dispatch = useDispatch();
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
  };

  return (
    <section>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <Message variant="danger"> {error?.data.message}</Message>
      ) : (
        <div className="container mx-auto px-6 mt-12 md:flex items-center gap-12">
          <img
            src={product.image}
            alt={product.name}
            className="rounded md:w-[40%]"
          />

          <div className="mt-6 md:mt-0">
            <h3 className="text-xl">{product.name}</h3>
            <p
              className={
                product.countInStock > 0
                  ? "bg-green-600 text-white w-[100px] text-center rounded py-2 text-sm mt-4"
                  : "bg-red-600 text-white w-[125px] text-center rounded py-2 text-sm mt-4"
              }
            >
              {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
            </p>
            <div className="mt-4">
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </div>
            <p className="mt-4">{product.description}</p>
            {product.countInStock > 0 && (
              <div>
                <select
                  id="countries"
                  className="mt-4 border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e) => setQty(Number(e.target.value))}
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <p className="font-bold mt-4 text-xl">Price: ${product.price}</p>
            <div className="mt-4 flex items-center space-x-4">
              <button
                className="btn-primary"
                disabled={product.countInStock === 0}
                onClick={addToCartHandler}
              >
                Add to cart
              </button>
              <Link to={"/"} className="btn-primary">
                Go Back
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductScreen;
