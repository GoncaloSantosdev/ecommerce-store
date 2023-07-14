// React Router
import { Link, useParams } from "react-router-dom";
// Redux
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../redux/slices/productsApiSlice";
// Components
import { Message, Spinner } from "../../components";
import { FaEdit, FaTrash } from "react-icons/fa";
// Toastify
import { toast } from "react-toastify";

const ProductListScreen = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteProduct(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <section>
      <div className="container mx-auto px-6 mt-12">
        <div className="flex justify-between items-center">
          <h2 className="text-left text-xl">Products</h2>
          <button className="btn-primary" onClick={createProductHandler}>
            Create Product
          </button>
        </div>

        {loadingCreate && <Spinner />}
        {loadingDelete && <Spinner />}

        {isLoading ? (
          <Spinner />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div className="relative overflow-x-auto mt-8">
            <table className="w-full text-sm text-left text-white bg-slate-800">
              <thead className="text-xs text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    NAME
                  </th>
                  <th scope="col" className="px-6 py-3">
                    PRICE
                  </th>
                  <th scope="col" className="px-6 py-3">
                    CATEGORY
                  </th>
                  <th scope="col" className="px-6 py-3">
                    BRAND
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {data.products.map((product) => (
                  <tr className="bg-slate-900" key={product._id}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-white whitespace-nowrap"
                    >
                      {product._id}
                    </th>
                    <td className="px-6 py-4">{product.name}</td>
                    <td className="px-6 py-4">${product.price}</td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4">{product.brand}</td>
                    <td className="px-6 py-4 flex space-x-8">
                      <Link to={`/admin/product/${product._id}/edit`}>
                        <FaEdit className="text-yellow-500" />
                      </Link>
                      <button onClick={() => deleteHandler(product._id)}>
                        <FaTrash className="text-red-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductListScreen;
