import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Nav from './components/Nav'
import Home from './components/Home'
import Signup from './components/Signup';
import Login from './components/Login';
import PleaseLogin from './components/PleaseLogin'
import ForgotPassword from './components/ForgotPassword'
import MyTrip from './components/MyTrip'
import Profile from './components/Profile'
import Attractions from './components/Attractions'
import Footer from './components/Footer'
import NotFound from './components/NotFound'
import Contact from './components/Contact';
import { AuthProvider } from './contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AttractionProvider } from './contexts/AttractionContext';

function App() {
  const { navigate } = useNavigate();


  return (
    <div className="App">
      <AuthProvider onSuccess={() => navigate("/")}>
      <AttractionProvider>
      <Nav />
      <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/contact" element={<Contact />}></Route>
          <Route exact path="/sign-up" element={<Signup />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/please-login" element={<PleaseLogin />}></Route>
          <Route exact path="/attractions" element={<Attractions/>}></Route>
          <Route exact path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route exact element={<PrivateRoute />}>
            <Route exact path="/my-trip" element={<MyTrip />}></Route>
            <Route exact path="/profile" element={<Profile />}></Route>
          </Route>
          <Route path="/*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
      </AttractionProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
