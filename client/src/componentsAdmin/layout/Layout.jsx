import { useState } from "react";
import Header from "../header";
import Sidebar from "../slideBar";

const AdminLayout = ({children}) => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container">
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <Header OpenSidebar={OpenSidebar} />
      {children}
    </div>
  );
};

export default AdminLayout;
