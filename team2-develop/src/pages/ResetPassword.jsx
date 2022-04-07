import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import IconLoader from "../components/UI/iconLoader";
import errorMessages from "../constants/message";
import {
  handleShowNotification,
  resetPasswordRequest,
} from "../store/actions/userActions";

const ResetPassword = () => {
  const params = new URL(document.location).searchParams;
  const email = params.get("email");
  const token = params.get("token");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onValid = async (dataSubmit) => {
    setIsLoading(true);
    const dataRequest = { ...dataSubmit, email, token };
    try {
      const { data } = await resetPasswordRequest(dataRequest);
      handleShowNotification(data?.msg, "success", dispatch);
      navigate("/");
    } catch (error) {
      if (error?.response?.data?.msg) {
        handleShowNotification(error?.response?.data?.msg, "error", dispatch);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full h-screen fixed bg-login opacity-60 bg-cover bg-center flex flex-col sm:justify-center items-center sm:pt-0"></div>
      <div className="w-full absolute z-30 sm:max-w-md top-1/2 left-1/2 p-5 translate-x-50 translate-y-50 bg-white rounded-md">
        <h3 className="mb-12 text-center text-4xl font-extrabold">
          Đổi mật khẩu
        </h3>
        <form onSubmit={handleSubmit(onValid)}>
          <div className="input-container">
            <input
              type="password"
              className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
              placeholder="Mật khẩu mới"
              autoComplete="false"
              maxLength={32}
              {...register("password", {
                required: {
                  value: true,
                  message: errorMessages.requiredField,
                },
                minLength: {
                  value: 8,
                  message: "Vui lòng nhập tối thiểu 8 ký tự",
                },
                maxLength: {
                  value: 32,
                  message: "Vui lòng nhập tối đa 32 ký tự",
                },
              })}
            />
            {errors.password && (
              <div className="error-msg">{errors.password.message}</div>
            )}
          </div>
          <div className="input-container mt-3">
            <input
              type="password"
              className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
              placeholder="Nhập lại mật khẩu mới"
              autoComplete="false"
              {...register("password_confirmation", {
                validate: (value) => {
                  return (
                    value === watch("password") ||
                    errorMessages.passwordNotMatched
                  );
                },
              })}
            />
            {errors.password_confirmation && (
              <div className="error-msg">
                {errors.password_confirmation.message}
              </div>
            )}
          </div>
          <div className="mt-6">
            <button
              className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition"
              type="submit"
            >
              {isLoading && <IconLoader />} Xác nhận
            </button>
            <p className="text-center">
              Đã có tài khoản? <Link to="/">Đăng nhập</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
