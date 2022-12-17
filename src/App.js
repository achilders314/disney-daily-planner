import React, { useState, useEffect } from 'react';
import './App.css';
import { app } from './firebase-config'
// import { collection, getDocs, addDoc, deleteDoc, doc, query, where } from 'firebase/firestore'
import { ref, get, getDatabase, child } from 'firebase/database'

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
          setAttractions(showKeys.map((show) => {return {name: show, data: attractionData.SHOW[show]}}));
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
      {parks.map((park) => {
        return(
          <div key={park.parkId} className="park">
            <h1 key={`name${park.data.name}`}>Name: {park.data.name}</h1>
            <h4 key={`email${park.data.slug}`}>Slug: {park.data.slug}</h4>
            <h4 key={`name${park.data.entityType}`}>Type: {park.data.entityType}</h4>
            <div className="attractions">
              <h2>Attractions</h2>
              {attractions.filter(attraction => attraction.data.parkId === park.parkId).map((attraction => {
                return(
                <div className="attractionCards">
                  <h3>{attraction.name}</h3>
                  <p>Status: {attraction.data.status}</p>
                  <p>Current Wait Time: {attraction.data.currentWaitTime}</p>
                  <p>Last Update: {attraction.data.lastUpdated}</p>
                </div>
                )
              }))}
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default App;
