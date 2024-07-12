import React, { useState, useEffect } from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
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
  const [data, setData] = useState([]);
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    customers: 0,
    admins: 0,
    offers: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/api/admin/dashboard");
        setData(response.data.chartData);
        setStats({
          products: response.data.products,
          categories: response.data.categories,
          customers: response.data.customers,
          admins: response.data.admins,
          offers: response.data.offers,
        });
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

   
    fetchData();

    }
  , []);

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>

      <div className="main-cards">
        <div className="cardd">
          <div className="cardd-inner">
            <h3>PRODUCTS</h3>
            <BsFillArchiveFill className="cardd_icon" />
          </div>
          <h1>{stats.products}</h1>
        </div>
        <div className="cardd">
          <div className="cardd-inner">
            <h3>CATEGORIES</h3>
            <BsFillGrid3X3GapFill className="cardd_icon" />
          </div>
          <h1>{stats.categories}</h1>
        </div>
        <div className="cardd">
          <div className="cardd-inner">
            <h3>CUSTOMERS</h3>
            <BsPeopleFill className="cardd_icon" />
          </div>
          <h1>{stats.customers}</h1>
        </div>
        <div className="cardd">
          <div className="cardd-inner">
            <h3>Admin</h3>
            <BsFillBellFill className="cardd_icon" />
          </div>
          <h1>{stats.admins}</h1>
        </div>
        <div className="cardd">
          <div className="cardd-inner">
            <h3>offer</h3>
            <BsFillBellFill className="cardd_icon" />
          </div>
          <h1>{stats.offers}</h1>
        </div>
      </div>

      <div className="charts">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
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

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
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
    </main>
  );
}

export default AdminHome;
