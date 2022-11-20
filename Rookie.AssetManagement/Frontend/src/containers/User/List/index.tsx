import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

const ListUser = () => {
  return (
    <>
      <div className="d-flex align-items-center ml-3">
        <Link to="/user/create" type="button" className="btn btn-danger">
          Create new User
        </Link>
      </div>
    </>
  );
};

export default ListUser;
