import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Hero from "./components/Hero";
import NewArrival from "./components/NewArrival";
import BestSeller from "./components/BestSeller";
import AboutUs from "./components/AboutUs";

import Shop from "./pages/Shop";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import ProductManagement from "./pages/admin/ProductManagement";
import CreateProduct from "./pages/admin/CreateProduct";
import EditProduct from "./pages/admin/EditProduct";
import BrandAbout from "./pages/BrandAbout";

// Admin
import AdminProductDetail from "./pages/admin/ProductDetail";
import OrderManagement from "./pages/admin/OrderManagement";

// Customer
import CustomerProductDetail from "./pages/customer/ProductDetail";
import Cart from "./pages/customer/Cart";
import Checkout from "./pages/customer/Checkout";
import Payment from "./pages/customer/Payment";
import MyOrders from "./pages/customer/MyOrders";

// Product Category
import Clothes from "./pages/customer/Clothes";
import Skirt from "./pages/customer/Skirt";
import Shoes from "./pages/customer/Shoes";
import Jewellery from "./pages/customer/Jewellery";
import Accessories from "./pages/customer/Accessories";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/product.css";

function Home() {
  return (
    <>
      <Hero />
      <NewArrival />
      <BestSeller />
      <AboutUs />
    </>
  );
}

function App() {
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      <Navbar />

      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Home />} />

        <Route path="/shop" element={<Shop />} />

        <Route path="/shop/:id" element={<CustomerProductDetail />} />

        <Route path="/clothes" element={<Clothes />} />
        <Route path="/skirt" element={<Skirt />} />
        <Route path="/shoes" element={<Shoes />} />
        <Route path="/jewellery" element={<Jewellery />} />
        <Route path="/accessories" element={<Accessories />} />

        <Route path="/brand-about" element={<BrandAbout />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* CUSTOMER (LOGIN REQUIRED) */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout/:id"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment/:id"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute>
              <ProductManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products/create"
          element={
            <ProtectedRoute>
              <CreateProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products/edit/:id"
          element={
            <ProtectedRoute>
              <EditProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products/:id"
          element={
            <ProtectedRoute>
              <AdminProductDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={<OrderManagement />}
        />

      </Routes>

      {!isAdminPage && <Footer />}
    </>
  );
}

export default App;