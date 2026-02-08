import React from "react";

function Pre(props) {
  return (
    <div id={props.load ? "preloader" : "preloader-none"}>
      <div className="preloader-content">
        <div className="navbar-brand" style={{ marginBottom: 0 }}>Shubham<span>.</span></div>
        <div className="preloader-bar" />
      </div>
    </div>
  );
}

export default Pre;
