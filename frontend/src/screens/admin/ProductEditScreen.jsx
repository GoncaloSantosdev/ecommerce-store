/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
// React Router
import { Link, useNavigate, useParams } from "react-router-dom";
// Redux
import {
  useUpdateProductMutation,
  useGetProductDetailsQuery,
  useUploadProductImageMutation,
} from "../../redux/slices/productsApiSlice";
// Components
import { Message, Spinner } from "../../components";
// Toast
import { toast } from "react-toastify";

const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    };

    const result = await updateProduct(updatedProduct);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Product Updated");
      navigate("/admin/productlist");
    }
  };
  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <section>
      <div className="container mx-auto px-6 mt-12">
        <div className="flex justify-between items-center">
          <h2 className="text-left text-xl">Edit Product</h2>
          <Link to={"/admin/productlist"} className="btn-primary">
            Go Back
          </Link>
        </div>

        <div className="mt-8">
          {loadingUpdate && <Spinner />}
          {isLoading ? (
            <Spinner />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <div className="w-full rounded-lg shadow border md:mt-0 xl:p-0 bg-slate-900 border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={submitHandler}
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium  text-white"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="image"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      Image
                    </label>
                    <input
                      id="image"
                      type="text"
                      placeholder="Enter image URL"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 block w-full p-2 rounded-md"
                    />
                    <input
                      id="file"
                      onChange={uploadFileHandler}
                      type="file"
                      className="opacity-0 absolute z-10 w-full"
                    />
                    <label
                      htmlFor="file"
                      className="cursor-pointer bg-white border-gray-300 hover:bg-gray-100 py-2 px-4 mt-2 inline-flex items-center rounded-md"
                    >
                      Choose File
                    </label>
                    {loadingUpload && <Spinner />}
                  </div>

                  <div>
                    <label
                      htmlFor="brand"
                      className="block mb-2 text-sm font-medium  text-white"
                    >
                      Brand
                    </label>
                    <input
                      type="text"
                      name="brand"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="countinstock"
                      className="block mb-2 text-sm font-medium  text-white"
                    >
                      Count In Stock
                    </label>
                    <input
                      type="number"
                      name="countinstock"
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                      className=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="category"
                      className="block mb-2 text-sm font-medium  text-white"
                    >
                      Category
                    </label>
                    <input
                      type="text"
                      name="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium  text-white"
                    >
                      Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <button type="submit" className="btn-primary">
                    Update Product
                  </button>

                  {isLoading && <Spinner />}
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductEditScreen;
