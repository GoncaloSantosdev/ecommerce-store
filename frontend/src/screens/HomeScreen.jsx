// React Router
import { Link, useParams } from "react-router-dom";
// Redux
import { useGetProductsQuery } from "../redux/slices/productsApiSlice";
// Components
import { Message, ProductCard, Spinner, Paginate } from "../components";

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <section>
      <div className="container mx-auto px-6 mt-12">
        <h2 className="text-center text-2xl md:text-3xl md:text-left">
          Our <span className="text-blue-700">Featured</span> Products
        </h2>

        <div className="mt-6">
          {keyword && (
            <Link to={"/"} className="btn-primary">
              Go Back
            </Link>
          )}
        </div>

        {isLoading ? (
          <Spinner />
        ) : error ? (
          <h2>
            <Message variant="danger"> {error?.data.message}</Message>
          </h2>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {data.products.map((product) => (
                <div key={product._id} className="flex justify-center">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            <Paginate
              pages={data.pages}
              page={data.page}
              keyword={keyword ? keyword : ""}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default HomeScreen;
