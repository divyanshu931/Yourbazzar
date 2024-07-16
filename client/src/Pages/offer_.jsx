import React from 'react';

import BestSellingProducts from '../components/bestproducts';
import ProductListing from '../components/productList';
import OfferFetch from '../components/offer_fetch';

import Layout from "../components/layout/layout_";

function OfferDetails() {
 
  

  return (
    <>
   <Layout>
     
      <OfferFetch/>
      <ProductListing/>
      <BestSellingProducts/>
   
      </Layout>
    </>
  );
}

export default OfferDetails;
