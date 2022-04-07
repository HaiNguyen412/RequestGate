import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listRequests } from "../../store/actions/requestActions";
import Table from "../Attributes/Table";
import Paginate from "../Paginate/Paginate";
import DetailRequest from "./DetailRequest";
import { AiOutlineFilter, AiOutlineDown } from "react-icons/ai";
import FilterRequest from "./FilterRequest";
import { useNavigate } from "react-router-dom";
import Loader from "../Attributes/Loader";
function ListRequest() {
  const userLogin = useSelector((state) => state.userLogin);
  const { isLoading,userInfo } = userLogin;
  const [page, setPage] = useState(1);
  const [detail, setDetail] = useState({});
  const [isChange, setIsChange] = useState(false);
  const dispatch = useDispatch();
  const requestList = useSelector((state) => state.requestList);
  const { requests } = requestList;
  const titleHeader = [
    "STT",
    "Name request",
    "Content request",
    "Author create",
    "Date Create",
    "Category",
    "Assignee",
    "Status",
  ];
  const clickDetail = (item) => {
    setDetail(item);
    setIsChange(!isChange);
  };
  useEffect(() => {
    if (userInfo) {
      dispatch(listRequests(page));
    }
  }, [dispatch, page, userInfo]);
  const [isFilter, setIsFilter] = useState(false);
  const handleFilter = () => {
    setIsFilter(!isFilter);
  }
  const history = useNavigate();
  useEffect(() => {
    userInfo ? history("/home") : history("/");
  }, [history,userInfo]);
  if (isLoading) return <Loader />;
  return (
    <>
    {userInfo &&(
      <div className="flex flex-auto h-fit justify-center">
        <div className="w-19/20 bg-white rounded-md float-left border border-slate-300">
          <h1 className="text-center py-3 text-4xl">List requests </h1>
          <div className="w-full">
            <div
              className={`border border-black w-19/20 cursor-pointer mx-auto`}
            >
              <div className="w-full h-fit relative border-x">
                <div className=" px-3 h-7 w-full " onClick={handleFilter}>
                  <div className="float-left">
                    <AiOutlineFilter className="inline" />
                    <span className="pl-3">Filter options</span>
                  </div>
                  <div className="float-right">
                    <AiOutlineDown className="inline" />
                  </div>
                </div>
              </div>
              <div className="relative w-full">
                {isFilter && <FilterRequest page={page} isChange={isFilter} setIsChange={setIsFilter} />}
              </div>
            </div>
          </div>
          <div className="w-19/20 mx-auto mt-10">
            <Table
              listHeader={titleHeader}
              handleDetail={clickDetail}
              listObject={requests?.data}
            />
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
      </div>
      )}
      {isChange && (
        <DetailRequest
          detail={detail}
          handleChange={() => setIsChange(!isChange)}
          isChange={isChange}
        />
      )}
    </>
  );
}

export default ListRequest;
