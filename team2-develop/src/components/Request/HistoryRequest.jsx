import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../../assets/images/male.png";
import { historyRequest } from "../../store/actions/requestActions";
import Paginate from "../Paginate/Paginate";

function HistoryRequest() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const requestHistoryList = useSelector((state) => state.requestHistoryList);
  const { requests } = requestHistoryList;
  useEffect(() => {
    dispatch(historyRequest(page));
  }, [dispatch, page]);
  return (
    <div className=" w-fit bg-white rounded-md mr-5 h-fit float-right border border-slate-300">
      <h1 className="text-center text-xl mt-3">History Requests</h1>
      <div>
        {requests?.data &&
          requests?.data.map((request) => (
            <div key={request.id} className="border m-2 w-fit p-3">
              <div className="flex items-center ">
                <img
                  className=" w-10 h-10 rounded-full my-1"
                  src={avatar}
                  alt=""
                />
                <span className="pl-3">{request.name}</span>
              </div>
              <div className="ml-1">
                <p>{request.title}</p>
                <p>
                  {new Date(Date.parse(request.created_at))
                    .toLocaleString("vi-VN")
                    .split(",")
                    .reverse()
                    .join(" ")}
                </p>
              </div>
            </div>
          ))}
      </div>
      <Paginate
        page={page}
        setPage={setPage}
        currentPage={requests?.current_page}
        perPage={requests?.per_page}
        total={requests?.total}
        prevPage={requests?.prev_page_url}
        nextPage={requests?.next_page_url}
      />
    </div>
  );
}

export default HistoryRequest;
