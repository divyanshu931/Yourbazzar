import React, { useState, useEffect } from "react";
import TopNavbar from "./topnavbar";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "./footer";
import Cookies from "universal-cookie";

const Layout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate(); 
    useEffect(() => {
        // Check if user is authenticated based on cookies
        const cookies = new Cookies();
        const token = cookies.get('token');
        const userId = cookies.get('userId');
        setIsAuthenticated(!!token && !!userId);
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleSignOut = () => {
        navigate('/signout');
    };

    return (
        <div>
            <TopNavbar />

            <div className={`p-3 shadow-sm bg-warning danger-nav osahan-home-header  ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                <div className="font-weight-normal mb-0 d-flex align-items-center">
                    <h4 className="m-0 fw-bold text-black">
                        Your <span className="text-success">Bajaar</span>
                    </h4>
                    <div className="ms-auto d-flex align-items-center">
                        {isAuthenticated ? (
                            <>
                                
                                <button className="btn btn-link text-dark fs-5" onClick={handleSignOut}>
                                    <i className="bi bi-box-arrow-right"></i> 
                                </button>
                            </>
                        ) : (
                            <Link to="/signin" className="me-3 text-dark fs-5">
                                <i className="bi bi-person-circle"></i>
                            </Link>
                        )}
                        <Link to="/bag" className="me-3 text-dark fs-5">
                            <i className="bi bi-basket"></i>
                        </Link>
                        <button
                            type="button"
                            className="toggle osahan-toggle fs-4 text-dark ms-auto btn btn-link p-0"
                            onClick={toggleSidebar}
                        >
                            <i className="bi bi-list"></i>
                        </button>
                    </div>
                </div>

                <Link to="/search" className="input-group input-group-lg bg-white border-0 shadow-sm rounded overflow-hidden mt-3 text-decoration-none">
                    <span className="input-group-text bg-white border-0">
                        <i className="bi bi-search text-muted"></i>
                    </span>
                    <input
                        type="text"
                        className="form-control border-0 ps-0"
                        placeholder="Search for Products.."
                    />
                </Link>
            </div>

            {/* Sidebar component */}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {children}
            <Footer />
        </div>
    );
};

export default Layout;
