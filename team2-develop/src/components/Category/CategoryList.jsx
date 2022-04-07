import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getAssigneeList,
  getCategoryList,
  handleShowNotification
} from "../../store/actions/userActions";
import Button from "../Attributes/Button";
import InputText from "../Attributes/InputText";
import TableCategory from "../Attributes/TableCategory";
import Paginate from "../Paginate/Paginate";
import NewCategoryModal from "./NewCategoryModal/NewCategoryModal";

function CategoryList() {
  const [valueSearch, setValueSearch] = useState("");
  const [myCategoryList, setMyCategoryList] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const dispatch = useDispatch();
  const [assigneeList, setAssigneeList] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: "",
    perPage: "",
    total: "",
    prevPage: "",
    nextPage: "",
    lastPage: "",
  });
  const titleHeader = ["#", "Name", "Assignee", "Status", "Actions"];
  const fetchAssigneeList = async () => {
    try {
      const { data } = await getAssigneeList();
      setAssigneeList(data.data);
    } catch (error) {
      handleShowNotification(error?.message, "error", dispatch);
    }
  }

  useEffect(() => {
    fetchAssigneeList();
    // eslint-disable-next-line 
  }, []);

  const fetchCategoryData = async (page, valueSearch) => {
    try {
      const { data } = await getCategoryList(page, valueSearch);
      setMyCategoryList(data.data);
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
    fetchCategoryData(page, valueSearch);
    // eslint-disable-next-line
  }, [page, valueSearch]);

  const handleOpen = (category) => {
    setOpen(true);
    setSelectedCategory(category);
  };

  const handleClose = () => setOpen(false);

  const handleBtnSearchClick = async () => {
    setPage(1)
    fetchCategoryData(page, valueSearch.toLowerCase())
  };

  const handleBtnAddClick = () => {
    handleOpen(null);
  };
  return (
    <div className="w-5/6 mx-auto flex flex-auto">
    <div className="my-5 space-y-3 w-full">
      <h1 className="text-center text-3xl">List Category</h1>
      <div className="grid grid-cols-4 gap-3">
        <div className="col-span-3">
          <InputText className="w-full border border-slate-900 focus-visible:outline-none focus-visible:pl-1 py-2 placeholder-shown:pl-1 pl-1"
            type="text"
            placeholder="Search..."
            handleChange={(e) => {
              setValueSearch(e.target.value)
              setPage(1)
            }}
            value={valueSearch}
          />
        </div>
        <div className="space-x-3 flex flex-row justify-end">
          <Button
            children="Search"
            onClick={handleBtnSearchClick}
            type="submit"
            className="bg-red-500 hover:bg-red-300 duration-300 text-white"
          />
          <Button
            children="Add"
            onClick={handleBtnAddClick}
            type="submit"
            className="bg-red-500 hover:bg-red-300 duration-300 text-white"
          />
        </div>
      </div>
      <TableCategory
        titleHeader={titleHeader}
        dataCategoryList={myCategoryList}
        handleEdit={handleOpen}
      />
      <NewCategoryModal
        open={open}
        handleClose={handleClose}
        selectedCategory={selectedCategory}
        assigneeList={assigneeList}
        title={selectedCategory ? "Update Category" : "Create New Category"}
        fetchCategoryData={fetchCategoryData}
        setPage={setPage}
        page={page}
        valueSearch={valueSearch}
        pagination={pagination}
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

export default CategoryList;