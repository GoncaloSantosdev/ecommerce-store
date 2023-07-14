/* eslint-disable no-unused-vars */
import { useEffect } from "react";
// React Router
import { Link, useParams } from "react-router-dom";
// Components
import { Message, Spinner } from "../components";
// Redux
import { useSelector } from "react-redux";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useDeliverOrderMutation,
} from "../redux/slices/ordersApiSlice";
// Paypal
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
// Toast
import { toast } from "react-toastify";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);
  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Order is paid");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    });
  }

  function onError(err) {
    toast.error(err.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Order Delivered");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  return (
    <section>
      <div className="container mx-auto px-6 mt-12">
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <Message variant="danger">Error</Message>
        ) : (
          <div className="md:flex md:space-x-12">
            <div>
              <h1 className="text-xl">
                Order: <span className="font-bold">{orderId}</span>
              </h1>

              <hr className="mt-4" />

              <div className="mt-4">
                <h2 className="text-lg font-semibold">Shipping</h2>
                <div className="mt-2 flex flex-col">
                  <p>
                    <span className="font-semibold">Name:</span>{" "}
                    {order.user.name}
                  </p>
                  <p className="mt-4">
                    <span className="font-semibold">Email:</span>{" "}
                    {order.user.email}
                  </p>

                  <p className="mt-4">
                    <span className="font-semibold">Address:</span>{" "}
                    {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city}{" "}
                    {order.shippingAddress.postalCode},{" "}
                    {order.shippingAddress.country}
                  </p>
                  <p className="mt-4">
                    <span className="font-semibold"></span>{" "}
                    {order.isDelivered ? (
                      <Message>Delivered on {order.deliveredAt}</Message>
                    ) : (
                      <Message variant="danger">Not Delivered</Message>
                    )}
                  </p>
                </div>
              </div>

              <hr />

              <div className="mt-4">
                <h2 className="text-lg font-semibold">Payment Method</h2>
                <div className="mt-2 flex flex-col">
                  <p>
                    <span className="font-semibold">Method:</span>{" "}
                    {order.paymentMethod}
                  </p>
                  <p className="mt-4">
                    <span className="font-semibold"></span>{" "}
                    {order.isPaid ? (
                      <Message>Paid on {order.paidAt}</Message>
                    ) : (
                      <Message variant="danger">Not Paid</Message>
                    )}
                  </p>
                </div>
              </div>

              <hr />

              <div className="mt-4">
                <h2 className="text-lg font-semibold">Order Items</h2>
                <div className="mt-4">
                  {order.orderItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col md:flex-row md:items-center md:space-x-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-[260px] md:h-auto object-cover rounded shadow md:w-32"
                      />
                      <div className="mt-4">
                        <Link
                          to={`/product/${item.product}`}
                          className="underline mt-4 md:mt-0"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-4 md:mt-2">
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <hr className="mt-4 mb-4 md:hidden" />
            <div className="md:w-[50%] mt-4">
              <h2 className="text-lg font-semibold">Order Summary</h2>

              <div className="rounded-lg border bg-white p-6 shadow-md w-full flex flex-col mt-6 space-y-4">
                <div>
                  <span className="font-bold">Items:</span> ${order.itemsPrice}
                </div>
                <div>
                  <span className="font-bold">Shipping:</span> $
                  {order.shippingPrice}
                </div>
                <div>
                  <span className="font-bold">Tax:</span> ${order.taxPrice}
                </div>
                <div>
                  <span className="font-bold">Total:</span> ${order.totalPrice}
                </div>

                <div>
                  {!order.isPaid && (
                    <div>
                      {loadingPay && <Spinner />}
                      {isPending ? (
                        <Spinner />
                      ) : (
                        <div>
                          <PayPalButtons
                            createOrder={createOrder}
                            onApprove={onApprove}
                            onError={onError}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {loadingDeliver && <Spinner />}

                {userInfo &&
                  userInfo.isAdmin &&
                  order.isPaid &&
                  !order.isDelivered && (
                    <div>
                      <button className="btn-primary" onClick={deliverHandler}>
                        Mark as delivered
                      </button>
                    </div>
                  )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default OrderScreen;
