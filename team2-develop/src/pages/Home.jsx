import React from "react";
import Main from "../components/Attributes/Main";
import Meta from "../components/Attributes/Meta";
import HistoryRequest from "../components/Request/HistoryRequest";
import ListRequest from "../components/Request/ListRequest";

function Home() {
  
  return (
    <>
      <Meta />
      <Main>
        <div className="bg-gray-light flex flex-auto h-10/12 py-8 justify-between">
          <ListRequest />
          <HistoryRequest />
        </div>
      </Main>
    </>
  );
}

export default Home;
