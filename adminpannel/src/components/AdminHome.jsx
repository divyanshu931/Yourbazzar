import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import {
  BsArchiveFill,
  BsGrid3X3GapFill,
  BsPeopleFill,
  BsTagFill,
  BsShopWindow,
} from "react-icons/bs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import axiosInstance from "../apis/axiosInstance";
import "./style.css";

function AdminHome() {
  const [stats, setStats] = useState({});
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/api/dashboard/counts");
        console.log("Response from backend:", response.data);

        const {
          productCount,
          categoryCount,
          adminCount,
          customerCount,
          offerCount,
          sellerCount
        } = response.data;

        setStats({
          products: productCount,
          categories: categoryCount,
          customers: customerCount,
          admins: adminCount,
          offers: offerCount,
          seller: sellerCount,
        });

        // Assuming response.data.chartData is properly formatted for recharts
        setData(response.data.chartData);
      } catch (error) {
        console.error("Error fetching data", error);
        setError("Failed to fetch data. Please try again later.");
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>

      <div className="main-cards">
     
        <div className="cardd">
        <Link to="/myproduct" className="cardd-link">
          <div className="cardd-inner">
          
            <h3>PRODUCTS</h3>
            <BsArchiveFill className="cardd_icon" />
          </div>
          <h1>{stats.products}</h1>
          </Link>
        </div>
       
      
        <div className="cardd">
        <Link to="/category-dashboard" className="cardd-link">
          <div className="cardd-inner">
            <h3>CATEGORIES</h3>
            <BsGrid3X3GapFill className="cardd_icon" />
          </div>
          <h1>{stats.categories}</h1>
          </Link>
        </div>
    
      
        <div className="cardd">
        <Link to="/customer-dashboard" className="cardd-link">
          <div className="cardd-inner">
            <h3>CUSTOMERS</h3>
            <BsPeopleFill className="cardd_icon" />
          </div>
          <h1>{stats.customers}</h1>
          </Link>
        </div>
       
       
     
        
       
        <div className="cardd">
        <Link to="/offer-dashboard" className="cardd-link">
          <div className="cardd-inner">
            <h3>OFFERS</h3>
            <BsTagFill className="cardd_icon" />
          </div>
          <h1>{stats.offers}</h1>
          </Link>
        </div>
       
     
        <div className="cardd">
        <Link to="/admin-control" className="cardd-link">
          <div className="cardd-inner">
            <h3>SELLERS</h3>
            <BsShopWindow className="cardd_icon" />
          </div>
          <h1>{stats.seller}</h1>
          </Link>
        </div>
       
      </div>

      <div className="charts">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default AdminHome;
