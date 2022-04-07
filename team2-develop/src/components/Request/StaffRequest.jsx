import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  requestApprovalRequest,
  requestRejectRequest,
  requestStaffRequest,
} from "../../store/actions/requestActions";
import TableStaffRequest from "../Attributes/TableStaffRequest";
import Paginate from "../Paginate/Paginate";

function StaffRequest() {
  const titleHeader = [
    "STT",
    "Name request",
    "Content request",
    "Author create",
    "Date Create",
    "Category",
    "Assignee",
    "Status",
    "Actions",
  ];
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [approve, setApprove] = useState(false);
  const requestStaff = useSelector((state) => state.requestStaff);
  const { requests } = requestStaff;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (userInfo) {
      dispatch(requestStaffRequest(page));
    }
  }, [dispatch, page, userInfo]);

  const clickApproval = (data) => {
    dispatch(requestApprovalRequest(data.id));
    dispatch(requestStaffRequest(page));
    setApprove(!approve);
  };
  const clickReject = (data) => {
    dispatch(requestRejectRequest(data.id));
    dispatch(requestStaffRequest(page));
    setApprove(!approve);
  };

  return (
    <div>
      <div className="w-5/6 mx-auto flex flex-auto">
        <div className="my-5 space-y-3 w-full bg-white p-5">
          <TableStaffRequest
            handleApproval={clickApproval}
            handleReject={clickReject}
            listKeyStaffRequest={titleHeader}
            listStaffRequest={requests}
            userInfo={userInfo}
          />
          {page > 1 && (
            <Paginate
              page={page}
              setPage={setPage}
              currentPage={requests?.current_page}
              perPage={requests?.per_page}
              total={requests?.total}
              prevPage={requests?.prev_page_url}
              nextPage={requests?.next_page_url}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default StaffRequest;
