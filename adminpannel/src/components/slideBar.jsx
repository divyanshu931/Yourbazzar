import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsMenuButtonWideFill,
} from "react-icons/bs";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function Sidebar({ openSidebarToggle, openSidebar, userRole }) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsCart3 className="icon_header" /> YOUR BAZAAR
        </div>
        <span className="icon close_icon" onClick={openSidebar}>
          X
        </span>
      </div>

      <div className="user-role">
        {userRole === "Admin" ? (
          <p>Welcome, Admin!</p>
        ) : userRole === "Seller" ? (
          <p>Welcome, Seller!</p>
        ) : (
          <p>No Access</p>
        )}
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/dashboard/admin">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </Link>
        </li>
       

        {/* Additional sidebar items based on user role */}
        {userRole === "Admin" && (
          <>
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
              <Link to="/admin-control">
                <BsMenuButtonWideFill className="icon" /> Admin Control
              </Link>
            </li>
            
            <li className="sidebar-list-item">
              <Link to="/customer-dashboard">
                <BsPeopleFill className="icon" /> Customers
              </Link>
            </li>
            <li className="sidebar-list-item">
              <Link to="/approval-request">
                <BsMenuButtonWideFill className="icon" /> Approval Requests
              </Link>
            </li>
          </>
        )}

        {/* Additional sidebar items for Seller role */}
        {userRole === "Seller" && (
          <>
            <li className="sidebar-list-item">
              <Link to="/seller-dashboard">
                <BsFillGrid3X3GapFill className="icon" /> Seller Dashboard
              </Link>
            </li>
            <li className="sidebar-list-item">
              <Link to="/product-dashboard">
                <BsFillArchiveFill className="icon" /> My Products
              </Link>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
}

export default Sidebar;
