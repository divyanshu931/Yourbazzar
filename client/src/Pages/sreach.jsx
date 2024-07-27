import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../apis/axiosInstance";
import TopNavbar from "../components/layout/topnavbar";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/footer";
import ProductItem from "../components/productmap";
import debounce from "lodash.debounce"; // Import debounce from lodash

const Search = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch search results
  const fetchSearchResults = async (query) => {
    if (query.trim().length < 1) {
      setSearchResults([]); // Clear results if query is too short
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get('api/public/products/search', {
        params: { q: query }
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching products:', error);
      setError('Failed to fetch search results. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Debounced search function
  const debouncedSearch = debounce((query) => {
    fetchSearchResults(query);
  }, 300); // Adjust delay as needed

  // Effect to handle search input change
  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddToCart = (userId, productId) => {
    // Implement your addToCart functionality here
    console.log(`Add product ${productId} to cart for user ${userId}`);
  };

  return (
    <div>
      <TopNavbar />

      <div className={`p-3 shadow-sm bg-warning danger-nav osahan-home-header sticky-top ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="font-weight-normal mb-0 d-flex align-items-center">
          <h4 className="m-0 fw-bold text-black">
            Your<span className="text-success">Bajaar</span>
          </h4>
          <div className="ms-auto d-flex align-items-center">
            <Link to="/signin" className="me-3 text-dark fs-5">
              <i className="bi bi-person-circle"></i>
            </Link>
            <Link to="/bag" className="me-3 text-dark fs-5">
              <i className="bi bi-basket"></i>
            </Link>
            <Link
              className="toggle osahan-toggle fs-4 text-dark ms-auto"
              onClick={toggleSidebar}
            >
              <i className="bi bi-list"></i>
            </Link>
          </div>
        </div>

        <div className="input-group input-group-lg bg-white border-0 shadow-sm rounded overflow-hidden mt-3">
          <span className="input-group-text bg-white border-0">
            <i className="bi bi-search text-muted"></i>
          </span>
          <input
            type="text"
            className="form-control border-0 ps-0"
            placeholder="Search for Products.."
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          
        </div>
      </div>

      {/* Display Search Results */}
      <div className="mt-3">
        {searchQuery.trim().length > 0 && searchResults.length === 0 && !loading && (
          <div className="text-center">
            <img
              src="https://blinkit.com/57070263a359a92dc0fe.png" // Replace with the path to your fallback image
              alt="No products found"
              style={{ width: '400px', height: '500' }}
            />
           <p style={{ fontSize: '50px', fontWeight: 'bold', color: 'lightgrey' }}>
  No products found.
</p>

          </div>
        )}
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="row">
          {searchResults.length > 0 ? (
            searchResults.map((product) => (
              <ProductItem 
                key={product._id} 
                product={product}
                addToCart={handleAddToCart} // Pass the addToCart handler
              />
            ))
          ) : (
            // This fallback is only shown if the search query is empty or less than 1 character
            searchQuery.trim().length < 1 && <p style={{ fontSize: '50px', fontWeight: 'bold', color: 'lightgrey', textAlign: 'center' }}> <img
            src="https://blinkit.com/57070263a359a92dc0fe.png" 
            style={{ width: '400px', height: '500' }}
            alt="No results"
            className="no-results-image"
          /><br/>Start typing to see results.</p>
          )}
        </div>
      </div>

      {/* Sidebar component */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Search;
