import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import { useState } from 'react';
import Footer from './components/common/Footer';
import PrivateRoute from "./components/PrivateRoute";
import AdsDetails from "./components/AdsDetails";
import AllAds from "./components/AllAds";
import PhoneAuth from "./components/PhoneAuth"
import Form from "./components/postAds/Form";
import BoostPaymentPage from "./components/Boost/BoostPaymentPage";
import { FormDataProvider } from "./components/postAds/FormDataContext";
import ContactUser from "./components/postAds/ContactUser";
import FormSuccess from "./components/postAds/FormSuccess";
import PhonesGadgets from "./pages/RoutesForNav/Phones&Gadgets";

import ElectronicsAppliances from "./pages/RoutesForNav/Electronics&Appliances";
import BooksStationery from "./pages/RoutesForNav/Books&Stationery";
import FashionClothing from "./pages/RoutesForNav//Fashion&Clothing";
import Services from "./pages/RoutesForNav/Services";
import Furnitures from "./pages/RoutesForNav/Furnitures";
import SpareParts from "./pages/RoutesForNav/SpareParts";
import Properties from "./pages/RoutesForNav/Properties";
import Vehicles from "./pages/RoutesForNav/Vehicles";
import SportsGym from "./pages/RoutesForNav/Sports&Gyms"

import EditAdForm from "./components/EditAdForm";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  // Console log to debug the current path
  console.log("Current Path:", location.pathname);

  // Check if the current path is not '/Profile' to decide if the Navbar should be displayed
  const showNavbar = location.pathname !== "/profile";

  return (
    <div className="w-full h-full flex flex-col">
      {showNavbar && <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
      <FormDataProvider>
        <Routes>


          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route path="/ads-details" element={<AdsDetails isLoggedIn={isLoggedIn} />} />
          <Route path="/all-ads" element={<AllAds isLoggedIn={isLoggedIn} />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/phone-auth" element={<PhoneAuth setIsLoggedIn={setIsLoggedIn} />} />

          <Route path="/ContactUser/:docId" element={<ContactUser isLoggedIn={isLoggedIn} />} />
          <Route path="/form-success" element={<FormSuccess isLoggedIn={isLoggedIn} />} />

          {/* Forms Routs For Nav */}
          <Route path="/phones&gadgets" element={<PhonesGadgets />} />
          <Route path="/electronics&appliances" element={<ElectronicsAppliances />} />

          {/* Edit form  */}
          <Route path="/edit-ad/:adsId" element={<EditAdForm />} />
    {/* Forms Routs For Nav */}
        <Route path="/phones&gadgets" element= {<PhonesGadgets/>}/>
        <Route path="/electronics&appliances" element= {<ElectronicsAppliances/>}/>
        <Route path="/Vehicles" element= {<Vehicles/>}/>
        <Route path="/Properties" element= {<Properties/>}/>
        <Route path="/Spare&Parts" element= {<SpareParts/>}/>
        <Route path="/Furnitures" element= {<Furnitures/>}/>
        <Route path="/Books&Stationery" element= {<BooksStationery/>}/>
        <Route path="/Sports&Gyms" element= {<SportsGym/>}/>
        <Route path="/Fashion&Clothings" element= {<FashionClothing/>}/>
        <Route path="/Services" element= {<Services/>}/>




          {/* Routes for Ads Detail */}

          <Route path="/ad-details/:id" element={<AdsDetails />} />

          <Route path="/profile" element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Profile />
            </PrivateRoute>
          } />
          <Route path="/boost-payment-page" element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <BoostPaymentPage />
            </PrivateRoute>
          } />
          <Route path="/form" element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Form />
            </PrivateRoute>
          } />

        </Routes>
      </FormDataProvider>

      <Footer />
    </div>
  );
}

export default App;
