import React from "react";
import Meta from "../components/Attributes/Meta";
import Main from "../components/Attributes/Main";
import CategoryList from "../components/Category/CategoryList";

function CategoryPage() {
  return (
    <Main>
      <Meta title="Categories" />
      <CategoryList />
    </Main>
  );
}

export default CategoryPage;
