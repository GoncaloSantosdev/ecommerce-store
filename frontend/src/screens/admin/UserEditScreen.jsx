import { useState, useEffect } from "react";
// React Router
import { Link, useNavigate, useParams } from "react-router-dom";
// Redux
import {
  useUpdateUserMutation,
  useGetUserDetailsQuery,
} from "../../redux/slices/usersApiSlice";
// Components
import { Message, Spinner } from "../../components";
// Toast
import { toast } from "react-toastify";

const UserEditScreen = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(userId);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await updateUser({ userId, name, email, isAdmin });
      toast.success("User updated successfully");
      refetch();
      navigate("/admin/userlist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <section>
      <div className="container mx-auto px-6 mt-12">
        <div className="flex justify-between items-center">
          <h2 className="text-left text-xl">Edit Product</h2>
          <Link to={"/admin/userlist"} className="btn-primary">
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
                      className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <label
                      htmlFor="isAdmin"
                      className="block text-sm font-medium text-white"
                    >
                      Is Admin
                    </label>
                    <input
                      type="checkbox"
                      name="isAdmin"
                      checked={isAdmin}
                      onChange={(e) => setIsAdmin(e.target.checked)}
                    />
                  </div>
                  <button type="submit" className="btn-primary">
                    Update User
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

export default UserEditScreen;
