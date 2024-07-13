import React, { useState } from "react";
import BestSellingProducts from "../components/bestproducts";
import TodayOffers from "../components/offer";

import CategoryList from "../components/CategoryList";

import ProductListing from "./offer_details";

import Layout from "../components/layout/layout_";

function Home() {


  return (
    <>
      
<Layout>
      <TodayOffers />
      <CategoryList />
      <BestSellingProducts />
      <ProductListing />
     
      </Layout >
    </>
  );
}

export default Home;
