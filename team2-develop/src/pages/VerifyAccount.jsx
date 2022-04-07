import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconLoader from "../components/UI/iconLoader";
import {
  handleShowNotification, verifyAccountRequest
} from "../store/actions/userActions";

const VerifyAccount = () => {
  const params = new URL(document.location).searchParams;
  const id = params.get("id");
  const hash = params.get("hash");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
      (async () => {
        try {
          setIsLoading(true);
          const dataRequest = {
            id:id,
            hash:hash
          };
          const { data } = await verifyAccountRequest(dataRequest);
          handleShowNotification(data?.message, "success", dispatch);
          navigate("/login")
        } catch (error) {
          handleShowNotification(error?.message, "error", dispatch);
          navigate("/login")
        }finally{
          setIsLoading(false)
        }
      })();
    }, [dispatch, hash, id, navigate])

  return (
    <>
      <div className="w-full h-screen fixed bg-login opacity-60 bg-cover bg-center flex flex-col sm:justify-center items-center sm:pt-0">
      </div>
      <div className="w-full absolute z-30 sm:max-w-md top-1/2 left-1/2 p-5 translate-x-50 translate-y-50 bg-white rounded-md">
        <h3 className="mb-12 text-center text-4xl font-extrabold">
          Xác thực tài khoản
        </h3>
        {isLoading && <IconLoader />}
      </div>

    </>
  );
};

export default VerifyAccount;
