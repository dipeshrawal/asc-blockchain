// index.js main
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Login from './Login';
import './index.css';
import FarmerDashboard from './Pages/Farmer/FarmerDashboard';
import DistributorDashboard from './Pages/Distributor/DistributorDashboard';
import ProductList from './Pages/Farmer/ProductList';
import Register from './Register';
import UserDashboard from './Pages/Customer/UserDashboard';
import FarmerData from './Components/FarmerData';
import RetailerData from './Components/RetailerData';
import DistributorProductInfo from './Pages/Distributor/DistributorProductInfo';
import DistributorFarmerInfo from './Pages/Distributor/DistributorFarmerInfo';
import DistributorRetailerInfo from './Pages/Distributor/DistributorRetailerInfo';
import AddProduct from './Pages/Farmer/AddProduct';
import RetailerDashboard from './Pages/Retailer/RetailerDashboard';
import RetailerFarmerdata from './Pages/Retailer/RetailerFarmerdata';
import RetailerProductInfo from './Pages/Retailer/RetailerProductInfo';
import FarmerProfile from "./Pages/Farmer/FarmerProfile";
import CustomerRegister from './Pages/Customer/CustomerRegister';
import FarmerRegister from './Pages/Farmer/FarmerRegister';
import DistributorRegister from './Pages/Distributor/DistributorRegister';
import RetailerRegister from './Pages/Retailer/RetailerRegister';
import SmartContract from './Pages/Farmer/SmartContract';
import DistributorSmartContract from './Pages/Distributor/DistributorSmartContract';
import RetailerSmartContract from './Pages/Retailer/RetailerSmartContract';
import FarmerProductInfo from './Pages/Farmer/FarmerProductInfo';
import CustomerSmartContract from './Pages/Customer/CustomerSmartContracts';
import CustomerProductInfo from './Pages/Customer/CustomerProductInfo';
import CustomerProfile from './Pages/Customer/CustomerProfile';
import DistributorProfile from './Pages/Distributor/DistributorProfile';
import RetailerProfile from './Pages/Retailer/RetailerProfile';
import CustomerProductrate from './Pages/Customer/CustomerProductrate';
import FarmerDistributorData from './Pages/Farmer/FarmerDistributorData';
import FarmerRetailerData from './Pages/Farmer/FarmerRetailerData';
import RetailerDistributorData from './Pages/Retailer/RetailerDistributorData';
import FarmerProductrate from './Pages/Farmer/FarmerProductrate';
import RetailerProductrate from './Pages/Retailer/RetailerProductrate';
import DistributorProductrate from './Pages/Distributor/DistributorProductrate';
import CustomerTransaction from './Pages/Customer/CustomerTransaction';
import CustomerTransactionData from './Pages/Customer/CustomerTransactiondata';
import FarmerTransaction from './Pages/Farmer/FarmerTransaction';
import DistributorTransaction from './Pages/Distributor/DistributorTransaction';
import RetailerTransaction from './Pages/Retailer/RetailerTransaction';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/distributordashboard" element={<DistributorDashboard />} />
      <Route path="/productlist" element={<ProductList />} />
      <Route path="/farmerdashboard" element={<FarmerDashboard />} />      
      <Route path="/register" element={<Register />} />      
      <Route path="/userdashboard" element={<UserDashboard />} />      
      <Route path="/farmerdata" element={<FarmerData />} />      
      <Route path="/retailerdata" element={<RetailerData />} />      
      <Route path="/distributorproductinfo" element={<DistributorProductInfo />} />      
      <Route path="/distributorfarmerinfo" element={<DistributorFarmerInfo />} />      
      <Route path="/distributorretailerinfo" element={<DistributorRetailerInfo />} />      
      <Route path="/addfarmerproducts" element={<AddProduct />} />      
      <Route path="/retailerdashboard" element={<RetailerDashboard />} />      
      <Route path="/retailerfarmerdata" element={<RetailerFarmerdata />} />      
      <Route path="/retailerproductinfo" element={<RetailerProductInfo />} />      
      <Route path="/farmerprofile" element={<FarmerProfile />} />      
      <Route path="/customerregister" element={<CustomerRegister />} />      
      <Route path="/farmerregister" element={<FarmerRegister />} />      
      <Route path="/distributorregister" element={<DistributorRegister />} />      
      <Route path="/retailerregister" element={<RetailerRegister />} />      
      <Route path="/smartcontract" element={<SmartContract />} />         
      <Route path="/distributorsmartcontract" element={<DistributorSmartContract />} />      
      <Route path="/retailersmartcontract" element={<RetailerSmartContract />} />      
      <Route path="/farmerproductinfo" element={<FarmerProductInfo />} />      
      <Route path="/customersmartcontract" element={<CustomerSmartContract />} />   
      <Route path="/customerproductinfo" element={<CustomerProductInfo />} />   
      <Route path="/customerprofile" element={<CustomerProfile />} />      
      <Route path="/distributorprofile" element={<DistributorProfile />} />      
      <Route path="/customerproductrate" element={<CustomerProductrate />} />      
      <Route path="/retailerprofile" element={<RetailerProfile />} />      
      <Route path="/farmerdistributordata" element={<FarmerDistributorData />} />      
      <Route path="/farmerretailerdata" element={<FarmerRetailerData />} />      
      <Route path="/retailerdistributordata" element={<RetailerDistributorData />} />      
      <Route path="/farmerproductrate" element={<FarmerProductrate />} />      
      <Route path="/retailerproductrate" element={<RetailerProductrate />} />      
      <Route path="/distributorproductrate" element={<DistributorProductrate />} />      
      <Route path="/customertransaction" element={<CustomerTransaction />} />      
      <Route path="/customertransactiondata" element={<CustomerTransactionData />} />      
      <Route path="/farmertransaction" element={<FarmerTransaction />} />      
      <Route path="/distributortransaction" element={<DistributorTransaction />} />      
      <Route path="/retailertransaction" element={<RetailerTransaction />} />      
       

    </Routes>
  </Router>
);
