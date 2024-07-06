import React from "react";
import { Link } from "react-router-dom";

function GetStart() {
  return (
    <div className="py-4 d-flex align-items-center justify-content-center">
      <div className="osahan-started pt-2 text-center">
        <img src="img/sign-in-pana.svg" className="img-fluid mb-2 mt-5 col-7 mx-auto" alt="Sign In" />
        <div className="head py-4 px-4 text-center">
          <h5 className="font-weight-bold mb-4">Start by creating an account.</h5>
          <p className="text-muted">I'm an early bird and I'm night owl so I'm<br />wise and I have worms.</p>
        </div>
        <div className="osahan-footer fixed-bottom p-3">
          <Link to="/signin" className="btn btn-success btn-lg w-100 shadow mb-3">SIGN IN</Link>
          <Link to="/signup" className="btn btn-outline-success btn-lg w-100 shadow">CREATE AN ACCOUNT</Link>
        </div>
      </div>
    </div>
  );
}

export default GetStart;
