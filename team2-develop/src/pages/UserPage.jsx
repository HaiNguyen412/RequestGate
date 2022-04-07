import React from "react";
import Meta from "../components/Attributes/Meta";
import Main from "../components/Attributes/Main";
import UserList from "../components/User/UserList";

function UserPage() {
  return (
      <Main>
      <Meta
        title="Users"
      />
        <UserList />
      </Main>
  );
}

export default UserPage;
