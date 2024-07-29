import React, { useState, useEffect } from "react";
import axiosInstance from "../apis/axiosInstance"; // Adjust the import path as needed
import ProductItem from "../components/productmap"; // Adjust the import path as needed
import FilterLayout from "../components/layout/filterLayout"; // Adjust the import path as needed

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch all products
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get('api/public/all'); // Adjust the API endpoint as needed
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <FilterLayout>
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="alert alert-danger text-center">{error}</div>}
      <div className="osahan-listing">
        <div className="row">
        {products.length > 0 ? (
          products.map(product => (
            <ProductItem key={product.id} product={product} />
          ))
        ) : (
          !loading && <div className="text-center">No products available</div>
        )}</div>
        </div>
    </FilterLayout>
  );
};

export default AllProducts;
