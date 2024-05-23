import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Footer from './components/common/Footer';
import PrivateRoute from "./components/PrivateRoute";
import AdsDetails from "./components/AdsDetails";
import PropertiesAdDetails from './components/PropertiesDetails';
import AllAds from "./components/AllAds";
import PhoneAuth from "./components/PhoneAuth";
import Form from "./components/postAds/Form";
import BoostPaymentPage from "./components/Boost/BoostPaymentPage";
import { FormDataProvider } from "./components/postAds/FormDataContext";
import ContactUser from "./components/postAds/ContactUser";
import FormSuccess from "./components/postAds/FormSuccess";
import PhonesGadgets from "./pages/RoutesForNav/Phones&Gadgets";
import ElectronicsAppliances from "./pages/RoutesForNav/Electronics&Appliances";
import BooksStationery from "./pages/RoutesForNav/Books&Stationery";
import FashionClothing from "./pages/RoutesForNav/Fashion&Clothing";
import Services from "./pages/RoutesForNav/Services";
import Furnitures from "./pages/RoutesForNav/Furnitures";
import SpareParts from "./pages/RoutesForNav/SpareParts";
import Properties from "./pages/RoutesForNav/Properties";
import Vehicles from "./pages/RoutesForNav/Vehicles";
import SportsGym from "./pages/RoutesForNav/Sports&Gyms";
import Vacancies from "./pages/RoutesForNav/Vacancies";
import Pets from "./pages/RoutesForNav/Pets";
import EditAdForm from "./components/EditAdForm";
import ChatApp from "./pages/ChatApp";
import { UserAuthContextProvider } from "./components/Chat/context/userAuthContext";
import { DrawerContextProvider } from "./components/Chat/context/drawerContext";
import Chat from "./components/Chat/pages/Chat/Chat";
import Preloader from './components/common/PreLoader';
import AllCards from './components/AllCards';
import { UserProvider } from './components/UserContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Simulate loading time with a timeout. Replace this with actual data fetching.
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  // Check if the current path is not '/profile' to decide if the Navbar should be displayed

  console.log("Current Path:", location.pathname);

  const isChatAppRoute = location.pathname === "/chat-app" || location.pathname.startsWith("/chat/");
  const showNavbar = !isChatAppRoute && location.pathname !== "/profile";;
  const showFooter = !isChatAppRoute;

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="w-full h-full flex flex-col">
      {showNavbar && <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
      <UserAuthContextProvider>
        <DrawerContextProvider>
          <FormDataProvider>
          <UserProvider>

            <Routes>
              <Route
                path='/chat-app'
                element={
                  <DrawerContextProvider>
                    <ChatApp/>
                  </DrawerContextProvider>
                }
              />
              <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
              <Route path="/ads-details" element={<AdsDetails isLoggedIn={isLoggedIn} />} />
              <Route path="/all-ads" element={<AllAds isLoggedIn={isLoggedIn} />} />
              <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/phone-auth" element={<PhoneAuth setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/ContactUser/:docId" element={<ContactUser isLoggedIn={isLoggedIn} />} />
              <Route path="/form-success" element={<FormSuccess isLoggedIn={isLoggedIn} />} />

              {/* Forms Routes For Nav */}
              <Route path="/phones&gadgets" element={<PhonesGadgets />} />
              <Route path="/electronics&appliances" element={<ElectronicsAppliances />} />

              {/* Edit form */}
              <Route path="/edit-ad/:adsId" element={<EditAdForm />} />

              {/* Forms Routes For Nav */}
              <Route path="/Vehicles" element={<Vehicles />} />
              <Route path="/Properties" element={<Properties />} />
              <Route path="/Spare&Parts" element={<SpareParts />} />
              <Route path="/Furnitures" element={<Furnitures />} />
              <Route path="/Books&Stationery" element={<BooksStationery />} />
              <Route path="/Sports&Gyms" element={<SportsGym />} />
              <Route path="/Fashion&Clothings" element={<FashionClothing />} />
              <Route path="/Services" element={<Services />} />
              
              {/* Routes for Ads Detail */}
              <Route path="/ad-details/:id" element={<AdsDetails />} />
              <Route path="/chat/:userId" element={<Chat/>} />
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
            </UserProvider>
          </FormDataProvider>
        </DrawerContextProvider>
      </UserAuthContextProvider>
      {showFooter && <Footer />}
    </div>
  );
}

export default App;
