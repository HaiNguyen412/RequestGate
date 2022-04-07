import React from "react";
import Meta from "../components/Attributes/Meta";
import Main from "../components/Attributes/Main";
import DepartmentList from "../components/Department/DepartmentList";

function DepartmentPage() {
  return (
      <Main>
      <Meta title="Departments" />
        <DepartmentList />
      </Main>
  );
}

export default DepartmentPage;
