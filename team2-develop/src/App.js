import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import AdminRequest from "./components/Request/AdminRequest";
import Notification from "./components/UI/notification";
import NotFound from "./pages/404";
import CategoryPage from "./pages/CategoryListPage";
import ChangePassword from "./pages/ChangePassword";
import DepartmentPage from "./pages/DepartmentPage";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import ListMyRequest from "./pages/ListMyRequest";
import ListStaffRequest from "./pages/ListStaffRequest";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";
import UserPage from "./pages/UserPage";
import VerifyAccount from "./pages/VerifyAccount";
import ViewDetailRequest from "./pages/ViewDetailRequest";
import DeniedRoute from "./routes/DeniedRoute";

function App() {
  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/reset-password" element={<ResetPassword />}></Route>
          <Route
            path="/requests/detail/:id"
            element={<ViewDetailRequest />}
          ></Route>
          <Route path="/" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/">

          <Route path="/home" element={<Home />} />
          </Route>
          <Route path="/admin-requests" element={<AdminRequest />} />
          <Route path="/auth/email/verify" element={<VerifyAccount />} />
          <Route path="/staffrequests" element={<ListStaffRequest />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/myrequests" element={<ListMyRequest />} />
          <Route element={<DeniedRoute />}>
            <Route path="/users" element={<UserPage />} />
            <Route path="/categories" element={<CategoryPage />} />
            <Route path="/departments" element={<DepartmentPage />} />
          </Route>
        </Routes>
        <Notification />
      </BrowserRouter>
    </div>
  );
}

export default App;
