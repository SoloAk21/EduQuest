import React from "react";
import { Outlet } from "react-router-dom";

function Educator() {
  return (
    <>
      <h1>Educator</h1>
      <Outlet /> {/* Correct Usage */}
    </>
  );
}

export default Educator;
