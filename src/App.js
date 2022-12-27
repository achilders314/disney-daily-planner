import React, { useState, useEffect, Fragment } from 'react';
import './App.css';
import { app } from './firebase-config'
// import { collection, getDocs, addDoc, deleteDoc, doc, query, where } from 'firebase/firestore'
import { Routes, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { ref, get, getDatabase, child } from 'firebase/database'
import Nav from './components/Nav'
import Home from './components/Home'
import Signup from './components/Signup';
import Login from './components/Login';
import PleaseLogin from './components/PleaseLogin'
import ForgotPassword from './components/ForgotPassword'
import MyTrip from './components/MyTrip'
import Attractions from './components/Attractions'
import Footer from './components/Footer'
import NotFound from './components/NotFound'
import { AuthProvider } from './contexts/AuthContext';

function App() {
  // const [newEmail, setNewEmail] = useState("")
  // const [newName, setNewName] = useState("")
  // const [users, setUsers] = useState([])
  // const usersCollectionRef = collection(db, "users")
  const parksCollectionRef = child(ref(getDatabase(app)), '/parks/')
  const attractionCollectionRef = child(ref(getDatabase(app)), '/attractions/')
  const [parks, setParks] = useState([])
  const [attractions, setAttractions] = useState([])
  const [restaurants, setRestaurants] = useState([])
  const [shows, setShows] = useState([])

  useEffect(() => {

    async function getParks(){
      let parkData;
      let parkIds;
      let attractionData;
      let attractionKeys;
      let showKeys;
      let restaurantKeys;
      await get(parksCollectionRef).then((snap) => {
        if(snap.exists()){
          parkData = snap.val();
          parkIds = Object.keys(parkData)
          console.log(snap.val());
          setParks(parkIds.map((park) => {return {parkId: park, data: parkData[park]}}));
        }
        else{
          console.log("No data")
        }
      }).catch((err) => {console.log(err)})
      await get(attractionCollectionRef).then((snap) => {
        if(snap.exists()){
          attractionData = snap.val();
          attractionKeys = Object.keys(attractionData.ATTRACTION)
          restaurantKeys = Object.keys(attractionData.RESTAURANT)
          showKeys = Object.keys(attractionData.SHOW)
          console.log(snap.val());
          setAttractions(attractionKeys.map((ride) => {return {name: ride, data: attractionData.ATTRACTION[ride]}}));
          setRestaurants(restaurantKeys.map((restaurant) => {return {name: restaurant, data: attractionData.RESTAURANT[restaurant]}}));
          setShows(showKeys.map((show) => {return {name: show, data: attractionData.SHOW[show]}}));
        }
        else{
          console.log("No data")
        }
      }).catch((err) => {console.log(err)})
      return;
      // setAttractions(attractionData.docs.map((doc) =>({...doc.data()})))
    }
    getParks();
    // console.log(attractions)
  }, [])



  return (
    <div className="App">
      <AuthProvider>
      <Nav />
      <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/contact" element={<main><h1 className="text-white">Contact Us</h1></main>}></Route>
          <Route exact path="/sign-up" element={<Signup />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/please-login" element={<PleaseLogin />}></Route>
          <Route exact path="/attractions" element={<Attractions parks={parks} attractions={attractions}/>}></Route>
          <Route exact path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route exact element={<PrivateRoute />}>
            <Route exact path="/my-trip" element={<MyTrip />}></Route>
            <Route exact path="/profile" element={<h1>Profile</h1>}></Route>
          </Route>
          <Route path="/*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
