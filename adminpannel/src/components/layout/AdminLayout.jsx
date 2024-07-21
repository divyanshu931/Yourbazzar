import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header";
import Sidebar from "../slideBar";

const AdminLayout = ({ children }) => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const navigate = useNavigate();

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      const expirationTime = localStorage.getItem("expirationTime");

      if (!token || !expirationTime) {
        // Token or expiration time not found, redirect to login after 1 second
        setTimeout(() => {
          navigate("/");
        }, ); // 1000 milliseconds delay
        return;
      }

      // Check if token is expired
      if (new Date().getTime() > expirationTime) {
        // Token expired, remove from localStorage and redirect to login after 1 second
        setTimeout(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("expirationTime");
          navigate("/");
        }, ); // 1000 milliseconds delay
      }
    };

    checkToken();
  }, [navigate]);

  return (
    <div className="grid-container">
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <Header OpenSidebar={OpenSidebar} />
      {children}
    </div>
  );
};

export default AdminLayout;
