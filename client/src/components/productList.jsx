import React, { useState, useEffect } from 'react';
import axiosInstance from '../apis/axiosInstance';
import ProductItem from './productmap'; // Import the ProductItem component

const categoryDisplayNames = {
  Milkandbread: 'Milk & bread',
  'Cold drinks': 'Cold Drinks',
  'Personal care': 'Personal Care',
  homeandoffice: 'Home & Office', // Updated to match the actual internal name
};

const ProductListing = () => {
  const [activeCategory, setActiveCategory] = useState('Milkandbread');
  const [categories] = useState(['Milkandbread', 'Cold drinks', 'Personal care', 'homeandoffice']); // Updated to match the internal names
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get('/api/public/products', {
          params: { category: activeCategory }
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [activeCategory]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const addToCart = async (userId, productId) => {
    try {
      const response = await axiosInstance.post('/api/addToCart', {
        userId: userId,
        productId: productId,
        quantity: 1
      });
      console.log('Added to cart:', response.data);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-3 bg-light">
      <div className="border-bottom border-top px-3 d-flex align-items-center justify-content-between">
        <ul className="nav home-tabs" id="pills-tab" role="tablist">
          {categories.map((category, index) => (
            <li className="nav-item" role="presentation" key={index} style={{ position: 'relative', zIndex: 2 }}>
              <button
                className={`nav-link ${activeCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category)}
              >
                {categoryDisplayNames[category] || category}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
        <div className="osahan-listing">
          <div className="osahan-listing p-0 m-0 row">
            {products.map((product) => (
              <ProductItem key={product._id} product={product} addToCart={addToCart} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
