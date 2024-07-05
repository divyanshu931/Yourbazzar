import React from 'react';
import { Link } from 'react-router-dom';
function Verification() {
  return (
    <>
      <div className="p-3 shadow-sm bg-warning danger-nav osahan-home-header">
        <div className="font-weight-normal mb-0 d-flex align-items-center">
          <h6 className="fw-normal mb-0 text-dark d-flex align-items-center">
            <a href="signin.html" className="text-dark me-3 fs-4"><i className="bi bi-chevron-left"></i></a>
            Verification
          </h6>
          <div className="ms-auto d-flex align-items-center">
            <a href="#" className="toggle osahan-toggle fs-4 text-dark ms-auto"><i className="bi bi-list"></i></a>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="text-center">
          <h4 className="fw-bold">Verifying your Mobile</h4>
          <p className="text-muted">We have sent 4 digit code on<br />+91 12345 67890</p>
        </div>
        <form className="my-5">
          <div className="d-flex justify-content-center gap-3">
            <div className="col-2">
              <input type="text" className="form-control form-control-lg text-center" value="7" required minLength="1" maxLength="1" />
            </div>
            <div className="col-2">
              <input type="text" className="form-control form-control-lg text-center" value="4" required minLength="1" maxLength="1" />
            </div>
            <div className="col-2">
              <input type="text" className="form-control form-control-lg text-center" value="6" required minLength="1" maxLength="1" />
            </div>
            <div className="col-2">
              <input type="text" className="form-control form-control-lg text-center" value="9" required minLength="1" maxLength="1" />
            </div>
          </div>
        </form>
        <div className="text-center h6">
          Resend in <span className="text-danger">0.30</span>
        </div>
      </div>

      {/* Fixed Bottom */}
      <div className="osahan-footer fixed-bottom p-3">
        <Link to="/home" className="btn btn-success btn-lg w-100 shadow">Verify</Link>
      </div>
    </>
  );
}

export default Verification;
