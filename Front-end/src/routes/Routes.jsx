import { Route, Router, Routes } from "react-router-dom";

import Home from "../Home/Home";
import LandingPageLayout from "../layout/LandingPageLayout";
import Login from "../login/Login";
import SignUp from "../signup/SignUp";
import Information from "../signup/Information";
import ResetPassword from "../forgot_password/ResetPassword";
import OtpScreen from "../forgot_password/OtpScreen";
import ConfirmPassword from "../forgot_password/ConfirmPassword";
import Collections from "../Home/Collections";
import About from "../Home/About";
import Blogs from "../Home/Blogs";
import OrderPage1 from "../orderFlows/OrderPage1";

import UserManagerLayout from "../layout/UserManagerLayout";
import ClientManager from "../clientManager/ClientManager";
import DashboardManger from "../dashboard/DashboardManger";
import OrderManager from "../ordersManager/OrderManager";
import BlogManager from "../blogManager/BlogManager";
import EmployeeManager from "../employeeManager/EmployeeManager";
import ProtectedRoute from "./ProtectedRoute";
import AuthProvider from "../provider/AuthProvider";
import LivePrice from "../Home/LivePrice";

function RouteMap() {
  return (
    <Routes>
      <Route path="/" element={<LandingPageLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/info" element={<Information />} />
        <Route path="/reset_password" element={<ResetPassword />} />
        <Route path="/otp" element={<OtpScreen />} />
        <Route path="/new_password" element={<ConfirmPassword />} />
        <Route path="/collections_page" element={<Collections />} />
        <Route path="/blogs_page" element={<Blogs />} />
        <Route path="/live_price_page" element={<LivePrice />} />
        <Route path="/about_page" element={<About />} />
        <Route
          path="/order_page"
          element={
            <ProtectedRoute roles={["CUSTOMER"]}>
              <OrderPage1 />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route
        path="/userManager"
        element={
          <ProtectedRoute roles={["ADMIN"]}>
            <UserManagerLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/userManager/dashboard"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <DashboardManger />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userManager/client_manager"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <ClientManager />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userManager/orders_manager"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <OrderManager />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userManager/blogs_manager"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <BlogManager />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userManager/employees_manager"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <EmployeeManager />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default RouteMap;
