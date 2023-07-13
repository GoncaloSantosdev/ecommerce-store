// React Router
import { Routes, Route } from "react-router-dom";
// Screens
import {
  CartScreen,
  HomeScreen,
  LoginScreen,
  OrderScreen,
  PaymentScreen,
  PlaceOrderScreen,
  ProductScreen,
  RegisterScreen,
  ShippingScreen,
} from "./screens";
// Components
import { Footer, Header, PrivateRoute } from "./components";
// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/product/:id" element={<ProductScreen />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />

        <Route path="" element={<PrivateRoute />}>
          <Route path="/shipping" element={<ShippingScreen />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/placeorder" element={<PlaceOrderScreen />} />
          <Route path="/order/:id" element={<OrderScreen />} />
        </Route>
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default App;
