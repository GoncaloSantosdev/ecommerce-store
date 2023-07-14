// Redux
import { useGetOrdersQuery } from "../../redux/slices/ordersApiSlice";
// Components
import { Message, Spinner } from "../../components";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <section>
      <div className="container mx-auto px-6 mt-12">
        <h2 className="text-left text-xl">Orders</h2>

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
                    USER
                  </th>
                  <th scope="col" className="px-6 py-3">
                    DATE
                  </th>
                  <th scope="col" className="px-6 py-3">
                    TOTAL
                  </th>
                  <th scope="col" className="px-6 py-3">
                    PAID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    DELIVERED
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <>
                    <tr className="bg-slate-900">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-white whitespace-nowrap"
                      >
                        {order._id}
                      </th>
                      <td className="px-6 py-4">
                        {order.user && order.user.name}
                      </td>
                      <td className="px-6 py-4">
                        {order.createdAt.substring(0, 10)}
                      </td>
                      <td className="px-6 py-4">${order.totalPrice}</td>
                      <td className="px-6 py-4">
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <FaTimes className="text-red-500" />
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {order.delivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <FaTimes className="text-red-500" />
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <Link to={`/order/${order._id}`} className="underline">
                          Details
                        </Link>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default OrderListScreen;
