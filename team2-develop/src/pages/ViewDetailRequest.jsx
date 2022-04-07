import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../assets/images/male.png";
import { REQUEST_STATUS } from "../constants/useConstant";
import {
  commentDetailRequest,
  detailRequest,
} from "../store/actions/requestActions";
import InputText from "../components/Attributes/InputText";
function ViewDetailRequest() {
  const idDetail =
    window.location.href.split("/")[window.location.href.split("/").length - 1];
  const dispatch = useDispatch();
  const ref = useRef(null);
  const requestDetail = useSelector((state) => state.requestDetail);
  const { requests: detailId } = requestDetail;

  const [content, setContent] = useState("");

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      dispatch(commentDetailRequest(idDetail, content));
      setContent("");
      dispatch(detailRequest(idDetail));
    }
  };

  useEffect(() => {
    dispatch(detailRequest(idDetail));
  }, [dispatch, idDetail]);

  const scrollToBottom = () => {
    ref?.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [detailId]);
  return (
    <>
      <div className=" bg-slate-100 w-full h-full">
        <div className="relative w-full h-full"></div>

        <div className="w-5/6 absolute top-1/2 z-30 left-1/2 translate-x-50 translate-y-50 bg-white border border-slate-300 flex flex-auto">
          <div className="w-11/12 my-5 space-y-3 mx-auto ">
            {detailId && (
              <div>
                <div className="border border-black bg-blue-300 float-right text-white py-1 px-2">
                  {REQUEST_STATUS[detailId.request.status]}
                </div>
                <div className="space-y-3">
                  <h1>{detailId.request.title}</h1>
                  <div className="flex items-center flex-auto">
                    <div className="w-10 h-10">
                      <img src={avatar} className="rounded-full " alt="" />
                    </div>
                    <div className="ml-5">
                      <h6>{detailId.request.author}</h6>
                      <h6>{detailId.request.created_at}</h6>
                    </div>
                  </div>
                  <div className="w-1/2">{detailId.request.description}</div>
                  <div className="grid gap-2 grid-cols-2">
                    <div className="flex flex-auto items-center">
                      <h3>Category</h3>
                      <p className="ml-5">{detailId.request.category}</p>
                    </div>
                    <div className="flex flex-auto items-center">
                      <h3>Assign</h3>
                      <p className="ml-5">{detailId.request.assignee}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="space-y-3">
              <h1>Comment ({detailId && detailId.comments.length})</h1>
              <div className="w-full border border-black">
                <div className="w-19/20 mx-auto my-2 overflow-auto h-44">
                  {detailId &&
                    detailId.comments.map((comment, index) => (
                      <div key={index} className="space-y-3">
                        <div className="flex flex-auto items-center">
                          <img
                            src={avatar}
                            className="rounded-full w-10 h-10"
                            alt=""
                          />
                          <div className="ml-5">
                            <p>{comment.author}</p>
                            <p>
                              {new Date(Date.parse(comment.created_at))
                                .toLocaleString("vi-VN")
                                .split(",")
                                .reverse()
                                .join(" ")}
                            </p>
                          </div>
                        </div>
                        <p>{comment.content}</p>
                      </div>
                    ))}
                  <div ref={ref}></div>
                </div>
              </div>
              <form onKeyDown={handleKeyDown}>
                <InputText
                  placeholder="Write a comment..."
                  value={content}
                  type="text"
                  handleChange={(e) => setContent(e.target.value)}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewDetailRequest;
