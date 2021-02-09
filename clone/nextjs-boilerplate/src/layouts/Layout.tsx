import React from "react";

import Navbar from "layouts/navigation/Layout";

export default function fun(props) {
  return (
    <>
      <Navbar />
      {props.children}
    </>
  );
}
