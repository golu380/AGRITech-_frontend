import React from 'react';

// import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {BrowserRouter as Router,
Routes,
Route,
Link
} from "react-router-dom";

import LoginComponent from './Component/Login/LoginComponent';
import Slider from './Slider/Slider'
// import LoginComponent from './Component/Login/LoginComponent';
// import Header from './Component/Header/Header';
import Header from './Component/Header/Header1';
import Footer from './Component/Footer/Footer';
// import Footer from './Component/Footer/Footer1';

import HomeScreen from './Screens/Home/HomeScreen';
import Layout1 from './Layout1';
const Layout = ()=>{
    return (
        
      <Router>
         <div>
    <Header />
    
  </div>
 
     <Routes>
         <Route  exact path="/" element={<HomeScreen />} />
         <Route exact path='/layout1' element={<Layout1 />} />
         <Route exact path="/login" element={<LoginComponent/>} />
         {/* <Route exact path='/login' element={<LoginComponent />} /> */}

     </Routes>
 <div>
  <Footer />
 </div>
 </Router>
   )
}

export default Layout