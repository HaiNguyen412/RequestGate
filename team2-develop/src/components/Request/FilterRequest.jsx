import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { STATUS } from "../../constants/useConstant";
import { listCategory } from "../../store/actions/categoryAction";
import { listRequests } from "../../store/actions/requestActions";
import DropDown from "../Attributes/DropDown";
import DropDownAssignee from "../Attributes/DropDownAssignee";
import DropDownCategory from "../Attributes/DropDownCategory";
import InputText from "../Attributes/InputText";

function FilterRequest({ page, isChange, setIsChange }) {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const categoryList = useSelector((state) => state.categoryList);
  const { category } = categoryList;
  const [filter, setFilter] = useState({
    request: "",
    content: "",
    status: "",
    category: "",
    assign: "",
    date: "",
    author: "",
  });
  const handleFilter = () => {
    dispatch(listRequests(page, filter));
    setIsChange();
  };
  useEffect(() => {
    dispatch(listCategory());
  }, [dispatch]);
  return (
    <>
      {isChange && (
        <div className="absolute  z-30 left-0  bg-red-500 h-full  top-full w-full">
          <div className="bg-white h-fit border border-black flex justify-center items-center">
            <div className="w-19/20 px-10 py-5">
              <div className="grid grid-cols-4 gap-5">
                <InputText
                  title="Request"
                  type="text"
                  placeholder="Request"
                  value={filter.request}
                  handleChange={(e) =>
                    setFilter({ ...filter, request: e.target.value })
                  }
                />
                <InputText
                  title="Content"
                  placeholder="Content"
                  type="text"
                  value={filter.content}
                  handleChange={(e) =>
                    setFilter({ ...filter, content: e.target.value })
                  }
                />
                <InputText
                  title="Date"
                  type="date"
                  value={filter.date}
                  handleChange={(e) =>
                    setFilter({ ...filter, date: e.target.value })
                  }
                />
                <div className="space-y-2">
                  <p>Status</p>
                  <DropDown
                    arrayList={STATUS}
                    className=""
                    item={filter}
                    setItem={setFilter}
                    name="status"
                    userInfo={userInfo}
                  />
                </div>
                <div className="space-y-2">
                  <p>Category</p>
                  <DropDownCategory
                    arrayList={category}
                    item={filter}
                    setItem={setFilter}
                    category_id="category_id"
                    category="category"
                    assignee_id="assignee_id"
                    assignee="assignee"
                    className="col-span-2"
                  />
                </div>
                <div className="space-y-2">
                  <p>Assignee</p>
                  <DropDownAssignee
                    arrayList={category}
                    item={filter}
                    setItem={setFilter}
                    category={filter.category}
                    id="assignee_id"
                    name="assignee"
                    className="col-span-2"
                  />
                </div>
              </div>
              <div className="my-3 flex justify-center">
                <Button
                  onClick={handleFilter}
                  children="Edit"
                  type="submit"
                  className="bg-indigo-700 py-2 px-4 rounded-md text-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FilterRequest;
