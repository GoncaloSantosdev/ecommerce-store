import { useState } from "react";
// React Router
import { Link, useParams } from "react-router-dom";
// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../redux/slices/productsApiSlice";
import { addToCart } from "../redux/slices/cartSlice";
// Components
import { Message, Rating, Spinner } from "../components";
// Toast
import { toast } from "react-toastify";

const ProductScreen = () => {
  const dispatch = useDispatch();
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review Submitted");
      setRating(0);
      setComment("");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <section>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <Message variant="danger"> {error?.data.message}</Message>
      ) : (
        <div className="container mx-auto px-6 mt-12">
          <div className="md:flex items-center md:space-x-12">
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
          <div className="mt-12">
            <h3 className="text-xl">Reviews</h3>
            <div className="mt-4">
              {product.reviews.length === 0 && <Message>No reviews</Message>}
            </div>

            <div>
              {product.reviews.map((review) => (
                <div key={review._id}>
                  <div className="flex items-center space-x-4">
                    <p className="font-semibold">{review.name}</p>
                    <p>{review.createdAt.substring(0, 10)}</p>
                  </div>
                  <div className="mt-2">
                    <Rating value={review.rating} />
                  </div>
                  <p className="mt-2">
                    <span className="font-semibold">Comment: </span>
                    {review.comment}
                  </p>
                  <hr className="mt-4" />
                </div>
              ))}

              <div className="mt-8">
                <h2 className="text-xl">Write a review</h2>

                {loadingProductReview && <Spinner />}
                {userInfo ? (
                  <div className="w-full rounded-lg mt-6">
                    <div className="space-y-4 md:space-y-6">
                      <form
                        className="space-y-4 md:space-y-6"
                        onSubmit={submitHandler}
                      >
                        <div>
                          <label
                            htmlFor="rating"
                            className="block mb-2 text-sm font-medium text-black"
                          >
                            Rating
                          </label>
                          <select
                            name="rating"
                            className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Your name"
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                          >
                            <option value="">Select</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Excellent</option>
                          </select>
                        </div>
                        <div>
                          <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-black"
                          >
                            Comment
                          </label>
                          <textarea
                            type="text"
                            name="name"
                            rows={5}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Comment here"
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn-primary"
                          disabled={isLoading}
                        >
                          Comment
                        </button>
                      </form>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4">
                    <Message>
                      Please <Link to={"/login"}>sign in</Link> to write a
                      review.
                    </Message>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductScreen;
