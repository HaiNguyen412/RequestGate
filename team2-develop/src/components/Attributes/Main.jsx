import React from "react";
import SlideBar from "../SlideBar/SlideBar";

function Main({ children }) {
  return (
    <div>
      <SlideBar />
      <div>{children}</div>
    </div>
  );
}

export default Main;
