import React from "react";
import "./style.css";
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsJustify,
  BsBoxArrowRight, // Sign Out icon
} from "react-icons/bs";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function Header({ openSidebar }) {
  const userId = cookies.get('userId'); // Fetch userId from cookies

  const handleSignOut = () => {
    // Remove userId cookie
    cookies.remove('userId');
    console.log("User signed out.");
    // Redirect or perform additional sign-out actions here
    // Example: Redirect to sign-in page
    window.location.href = '/';
  };

  return (
    <header className="header">
      <div className="menu-icon">
        {/* Ensure openSidebar is correctly passed and triggers sidebar toggle */}
        <BsJustify className="icon" onClick={openSidebar} />
      </div>
      <div className="header-left">
      
        <BsFillEnvelopeFill className="icon" />
      </div>
      <div className="header-right">
        {userId ? (
          <BsBoxArrowRight
            className="icon sign-out-icon"
            onClick={handleSignOut}
            title="Sign Out"
          />
        ) : null}
      </div>
    </header>
  );
}

export default Header;
