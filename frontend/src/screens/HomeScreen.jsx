// Redux
import { useGetProductsQuery } from "../redux/slices/productsApiSlice";
// Components
import { Message, ProductCard, Spinner } from "../components";

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <section>
      <div className="container mx-auto px-6 mt-12">
        <h2 className="text-center text-2xl md:text-3xl md:text-left">
          Our <span className="text-blue-700">Featured</span> Products
        </h2>

        {isLoading ? (
          <Spinner />
        ) : error ? (
          <h2>
            <Message variant="danger"> {error?.data.message}</Message>
          </h2>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {products.map((product) => (
                <div key={product._id} className="flex justify-center">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default HomeScreen;
