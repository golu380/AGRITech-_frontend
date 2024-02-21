import React from 'react';

// import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {BrowserRouter as Router,
Routes,
Route,
Link
} from "react-router-dom";

import LoginComponent1 from './Component/Login/LoginComponent1';
import Register from './Component/Login/Register';
import Slider from './Slider/Slider'
import FarmerScreen from './Screens/FarmerScreen/FarmerScreen';
// import LoginComponent from './Component/Login/LoginComponent';
// import Header from './Component/Header/Header';
import Header from './Component/Header/Header1';
import Footer from './Component/Footer/Footer';
import SupplierScreen from './Screens/Supplier/SupplierScreen';
// import Footer from './Component/Footer/Footer1';

import HomeScreen from './Screens/Home/HomeScreen';
import Layout1 from './Layout1';
import ProfileScreen from './Screens/ProfileScreen/ProfileScreen';
const Layout = ()=>{
    return (
        
      <Router>
         <div>
    <Header />
    
  </div>
 
     <Routes>
         <Route  exact path="/" element={<HomeScreen />} />
         <Route exact path='/layout1' element={<Layout1 />} />
         <Route exact path="/login" element={<LoginComponent1 />} />
         <Route exact path='/register' element={<Register  />} />
         <Route exact path='/farmer' element={<FarmerScreen />} />
         <Route exact path ='/supplier' element={<SupplierScreen />} />
         <Route exact path='/profile' element={<ProfileScreen/>} />
         {/* <Route exact path='/login' element={<LoginComponent />} /> */}

     </Routes>
 <div>
  <Footer />
 </div>
 </Router>
   )
}

export default Layout