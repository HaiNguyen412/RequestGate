import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAdminRequestList, handleShowNotification } from "../../store/actions/userActions";
import TableAdminRequest from "../Attributes/TableAdminRequest";
import Paginate from "../Paginate/Paginate";
import AdminRequestModal from "./AdminRequestModal";

function AdminRequest() {
  const [open, setOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [myRequestList, setMyRequestList] =useState([]);
  const [pagination, setPagination] =useState([]);
  const [page, setPage] = useState(1);
  const titleHeader = [
    "STT",
    "Name request",
    "Content request",
    "Author create",
    "Category",
    "Date Create",
    "Due Date",
    "Approval",
    "Status",
    "Actions",
  ];
  const dispatch = useDispatch();

  const fetchAdminRequestData = async (page) => {
    try {   
      const { data } = await getAdminRequestList(page);
      setMyRequestList(data.data);
      setPagination({
        currentPage: data.current_page,
        perPage: data.per_page,
        total: data.total,
        prevPage: data.prev_page_url,
        nextPage: data.next_page_url, 
        lastPage: data.last_page
      })
    } catch (error) {
      handleShowNotification(error?.message, "error", dispatch);
    }
  };
  useEffect(() => {
    fetchAdminRequestData(page);   
  // eslint-disable-next-line
  }, [page]);
  const handleOpen = (request) => {
    setOpen(true);
    setSelectedRequest(request);
  }

  const handleClose = () => setOpen(false);
  
  return (
    <div className="w-5/6 mx-auto flex flex-auto">
      <div className="py-5 space-y-3 w-full">

        <TableAdminRequest
          titleHeader={titleHeader}
          dataRequestList={myRequestList}
          handleEdit={handleOpen}
        />
        <AdminRequestModal
          open={open}
          handleClose={handleClose}
          selectedRequest={selectedRequest}
          title={selectedRequest ? "Update Status Request" : "Tạo mới Department"}
          fetchAdminRequestData={fetchAdminRequestData}
        />
        <Paginate
          page={page}
          setPage={setPage}
          currentPage={pagination?.currentPage}
          perPage={pagination?.perPage}
          total={pagination?.total}
          prevPage={pagination?.prev_page_url}
          nextPage={pagination?.next_page_url}
          lastPage={pagination?.last_page}
        />
      </div>
    </div>
  );
}

export default AdminRequest;
