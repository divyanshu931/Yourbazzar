import React, { useState, useEffect } from 'react';
import axiosInstance from '../apis/axiosInstance';
import { Link } from 'react-router-dom';

const ProductListing = () => {
  const [activeCategory, setActiveCategory] = useState('Milk&bread');
  const [categories] = useState(['Milk&bread', 'Cold drinks', 'Personal care', 'Home']);
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
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
        <div className="osahan-listing">
          <div className="osahan-listing p-0 m-0 row">
            {products.map((product) => (
              <div className="text-dark col-4 px-0 border-bottom border-end position-relative" key={product._id}>

<div class="list_item_gird m-0 bg-white listing-item">
                <Link to={`/product-detail/${product._id}`} className="text-decoration-none">
              
                    <span class="badge bg-success m-3 position-absolute">{product.discount}% OFF</span>
                    <div class="list-item-img p-4">



                      <img
                        src={`${axiosInstance.defaults.baseURL}/${product.image}`}
                        className="img-fluid p-3"
                        alt={product.name}

                      />
                    </div>
                
                </Link>
                <div className="tic-div px-3 pb-3">
                  <p className="mb-1 text-black">{product.name}</p>
                  <p className="mb-2 text-muted">{product.description}</p>
                  <h6 className="card-title mt-2 mb-3 text-success fw-bold">
                    ₹{product.price}.00{' '}
                    <small className="text-decoration-line-through text-muted small fw-light">{product.mrp}</small>
                  </h6>
                  <div className="d-flex align-items-center justify-content-between gap-1">

                  <div className="quantity-btn">
              <div className="input-group input-group-sm border rounded overflow-hiddem">
                <div className="btn btn-light text-success minus border-0 bg-white"><i className="bi bi-dash"></i></div>
                <input type="text" className="form-control text-center box border-0" value="1" placeholder="" aria-label="Example text with button addon" />
                <div className="btn btn-light text-success plus border-0 bg-white"><i className="bi bi-plus"></i></div>
              </div>
            </div>


                    <div>
                      <button
                        className="btn btn-success btn-sm d-flex border-0"
                        onClick={() => addToCart('user123', product._id)}
                      >
                        <i className="bi bi-plus me-2"></i> ADD
                      </button>
                    </div>
                  </div>
                </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
