import { Link } from "react-router-dom";
// Redux
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../redux/slices/usersApiSlice";
// Components
import { Message, Spinner } from "../../components";
import { FaTimes, FaEdit, FaTrash, FaCheck } from "react-icons/fa";
// Toast
import { toast } from "react-toastify";

const UserListScreen = () => {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();

  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteUser(id);
        refetch();
        toast.success("User deleted successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <section>
      <div className="container mx-auto px-6 mt-12">
        <h2 className="text-left text-xl">Users</h2>

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
                    EMAIL
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ADMIN
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr className="bg-slate-900" key={user._id}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-white whitespace-nowrap"
                    >
                      {user._id}
                    </th>
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4 underline cursor-pointer">
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>
                    <td className="px-6 py-4">
                      {user.isAdmin ? (
                        <FaCheck className="text-green-500" />
                      ) : (
                        <FaTimes className="text-red-500" />
                      )}
                    </td>
                    <td className="px-6 py-4 flex space-x-8">
                      <Link to={`/admin/user/${user._id}/edit`}>
                        <FaEdit className="text-yellow-500" />
                      </Link>
                      <button onClick={() => deleteHandler(user._id)}>
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

export default UserListScreen;
