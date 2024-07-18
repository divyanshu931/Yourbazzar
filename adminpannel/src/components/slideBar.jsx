import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsCartCheckFill,

  
} from "react-icons/bs";
import { RiAdminFill } from "react-icons/ri";
import axiosInstance from "../apis/axiosInstance";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const [menuItems, setMenuItems] = useState([]);
  const [isSuperUserOpen, setSuperUserOpen] = useState(false);

  useEffect(() => {
    // Fetch menu items or other data if needed
    axiosInstance.get("/api/menu-items")
      .then(response => {
        setMenuItems(response.data);
      })
      .catch(error => {
        console.error("Error fetching menu items:", error);
      });
  }, []);

  const toggleSuperUser = () => {
    setSuperUserOpen(!isSuperUserOpen);
  };

  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsCart3 className="icon_header" /> YOUR BAZZAR
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/dashboard/admin">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/product-dashboard">
            <BsFillArchiveFill className="icon" /> Products
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/category-dashboard">
            <BsFillGrid3X3GapFill className="icon" /> Categories
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/offer-dashboard">
            <BsListCheck className="icon" /> Offers
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/Order-dashboard">
            <BsCartCheckFill className="icon" /> order
          </Link>
        </li>

        <li className="sidebar-list-item" onClick={toggleSuperUser}>
          <span className="icon">
            <RiAdminFill/> Owner Control
          </span>
        </li>
        {isSuperUserOpen && (
          <ul className="dropdown-list">
            <li className="sidebar-list-item">
              <Link to="/admin-control">
                <BsMenuButtonWideFill className="icon" /> Admin Control
              </Link>
              
            </li>

            <li className="sidebar-list-item">
          <Link to="/customer-dashboard">
            <BsPeopleFill className="icon" /> Customers
          </Link>
        </li>
            {/* Add more super user items here */}
          </ul>
        )}
      </ul>
    </aside>
  );
}

export default Sidebar;
