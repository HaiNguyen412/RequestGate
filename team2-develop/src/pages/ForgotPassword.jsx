import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import IconLoader from "../components/UI/iconLoader";
import errorMessages from "../constants/message";
import {
  handleShowNotification,
  verifyEmailRequest,
} from "../store/actions/userActions";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const onValid = async (dataEmail) => {
    setIsLoading(true);
    try {
      const { data } = await verifyEmailRequest(dataEmail.email);
      const msg = data?.msg || "Gửi email xác nhận thành công";
      handleShowNotification(msg, "success", dispatch);
      setIsSubmitted(true);
      setEmail(dataEmail.email);
    } catch (error) {
      const msg =
        error?.response?.data?.msg ||
        error?.response?.data ||
        error?.response?.message ||
        "Không thể xác nhận e-mail";
      handleShowNotification(msg, "error", dispatch);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="w-full fixed h-screen bg-login opacity-60 bg-cover bg-center flex flex-col sm:justify-center items-center sm:pt-0"></div>
      <div className="w-full absolute z-30 sm:max-w-md top-1/2 left-1/2 p-5 translate-x-50 translate-y-50 bg-white rounded-md">
        <h3 className="mb-12 text-center text-4xl font-extrabold">
          Quên mật khẩu
        </h3>
        <form onSubmit={handleSubmit(onValid)}>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
            placeholder="Email"
            maxLength={50}
            {...register("email", {
              required: {
                value: true,
                message: errorMessages.requiredField,
              },
              pattern: {
                value:
                  //eslint-disable-next-line
                  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                message: errorMessages.inValidEmail,
              },
            })}
          />
          {errors.email && (
            <div className="error-msg">{errors.email.message}</div>
          )}
          <div className="actions">
            <div className="d-flex justify-content-end">
              {isSubmitted ? (
                <p>
                  Phương thức xác thực đã được gửi đến<br></br>
                  <a
                    className="underline decoration-sky-600 md:decoration-blue-400"
                    href="https://mail.google.com/mail/u/0/#inbox"
                  >
                    {email}
                  </a>
                </p>
              ) : (
                <p>Mã xác thực sẽ được gửi đến Email này</p>
              )}
            </div>
          </div>
          <div className="mt-6">
            <button
              className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition"
              type="submit"
            >
              {isLoading ? <IconLoader /> : ""} Xác nhận
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
