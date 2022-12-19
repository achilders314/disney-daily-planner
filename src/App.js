import React, { useState, useEffect } from 'react';
import './App.css';
import { app } from './firebase-config'
// import { collection, getDocs, addDoc, deleteDoc, doc, query, where } from 'firebase/firestore'
import { Routes, Route } from 'react-router-dom';
import { ref, get, getDatabase, child } from 'firebase/database'
import Nav from './components/Nav'
import Attractions from './components/Attractions'
import Footer from './components/Footer'

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
      <Nav />
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>}></Route>
        <Route path="/my-plans" 
          element={<Attractions parks={parks} attractions={attractions}/>}></Route>
        <Route path="/faq" element={<h1>FAQ</h1>}></Route>
        <Route path="/contact" element={<h1>Contact Us</h1>}></Route>
        <Route path="/profile" element={<h1>Profile</h1>}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
