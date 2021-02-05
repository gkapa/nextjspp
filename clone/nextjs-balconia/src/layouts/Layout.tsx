import React from "react";

import Navbar from "layouts/navigation/Navbar";

export default function fun(props) {
  return (
    <>
      <Navbar />
      {props.children}
    </>
  );
}
