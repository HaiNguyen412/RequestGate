import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Meta from "../components/Attributes/Meta";
import { login, postLoginGoogle } from "../store/actions/userActions";
function Login() {
  const [account, setAccount] = useState({
    email: "",
    password: "",
    remember_me: "",
  });
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, error: errorInfo } = userLogin;
  const [error, setError] = useState("");
  const history = useNavigate();
  useEffect(() => {
 
    if (userInfo) {
      
      history("/home");
    }
  }, [history, userInfo]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(account.email, account.password, account.remember_me));
  };
  const responseGoogle = (res) => {
    dispatch(postLoginGoogle(res?.profileObj, account.remember_me))
   
  };

  useEffect(() => {
    setError(errorInfo);
    const errorTimeout = setTimeout(() => {
      setError("");
    }, 5000);
    return () => clearTimeout(errorTimeout);
  }, [errorInfo]);
  return (
    <>
      <div className="w-full h-full fixed bg-login opacity-60 bg-cover bg-center pt-10 flex flex-col sm:justify-center items-center sm:pt-0"></div>
      <Meta title="Login to HBLab Gate" />
      <div className="w-full absolute z-30 sm:max-w-md top-1/2 left-1/2 p-5 translate-x-50 translate-y-50 bg-white rounded-md">
        <h2 className="mb-12 text-center text-4xl font-extrabold">
          Welcome to HBLab
        </h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              value={account.email}
              onChange={(e) =>
                setAccount({ ...account, email: e.target.value })
              }
              type="text"
              required
              placeholder="Email"
              className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Password</label>
            <input
              value={account.password}
              onChange={(e) =>
                setAccount({ ...account, password: e.target.value })
              }
              type="password"
              required
              placeholder="Password"
              className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
            />
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                onClick={() => setAccount({ ...account, remember_me: "on" })}
                className="border border-gray-300 text-red-600 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
              />
              <label className="ml-2 block text-sm leading-5 text-gray-900">
                Remember me
              </label>
            </div>
            <Link to="/forgot-password" className="text-sm">
              Forgot your password?
            </Link>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition"
            >
              Sign In
            </button>
          </div>
          <GoogleLogin
            clientId="408090204292-9g0svausp9dpt7cjqi33a7limn2iuokg.apps.googleusercontent.com"
            buttonText="Login in with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
            className="w-full flex justify-center font-bold mt-3 rounded-md"
          />
        </form>
      </div>
    </>
  );
}
export default Login;
