/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { useProfileMutation } from "../redux/slices/usersApiSlice";
import { useGetMyOrdersQuery } from "../redux/slices/ordersApiSlice";
import { setCredentials } from "../redux/slices/authSlice";
// Components
import { Message, Spinner } from "../components";
// Toast
import { toast } from "react-toastify";
// React Icons
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo.name, userInfo.email, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await updateProfile({
        _id: userInfo._id,
        name,
        email,
        password,
      }).unwrap();

      dispatch(setCredentials(res));
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <section>
      <div className="container mx-auto px-6 mt-12 md:flex md:justify-between md:space-x-6">
        <div className="w-full">
          <div className="w-full rounded-lg shadow border md:mt-0xl:p-0 bg-slate-900 border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                Update your profile
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium  text-white"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium  text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="name@company.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium  text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <button className="btn-primary" type="submit">
                  Update
                </button>

                {loadingUpdateProfile && <Spinner />}
              </form>
            </div>
          </div>
        </div>

        <div className="mt-4 md:mt-0">
          {isLoading ? (
            <h2>Loading...</h2>
          ) : error ? (
            <Message variant="danger">
              {error?.data?.message || error.error}
            </Message>
          ) : (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-slate-800 text-gray-200 mt-12 md:mt-0">
              <table className="w-full text-sm text-left text-gray-400">
                <thead className="text-xs uppercase text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Paid
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Delivered
                    </th>
                    <th scope="col" className="px-6 py-3"></th>
                  </tr>
                </thead>
                {orders.map((order) => (
                  <tbody key={order._id}>
                    <tr className="bg-slate-900 border-b border-gray-700 hover:bg-gray-800">
                      <td className="w-32 p-4">{order._id}</td>
                      <td className="px-6 py-4 font-semibold text-white">
                        {order.createdAt.substring(0, 10)}
                      </td>
                      <td className="px-6 py-4 font-semibold text-white">
                        ${order.totalPrice}
                      </td>
                      <td className="px-6 py-4 font-semibold text-white">
                        {order.isPaid ? (
                          <>{order.paidAt.substring(0, 10)}</>
                        ) : (
                          <FaTimes className="text-red-600" />
                        )}
                      </td>
                      <td className="px-6 py-4 font-semibold text-white">
                        {order.isDelivered ? (
                          <>{order.deliveredAt.substring(0, 10)}</>
                        ) : (
                          <FaTimes className="text-red-600" />
                        )}
                      </td>
                      <td className="px-6 py-4 font-semibold text-white">
                        <Link className="underline" to={`order/${order._id}`}>
                          Details
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfileScreen;
