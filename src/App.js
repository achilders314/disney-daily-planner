import React, { useState, useEffect } from 'react';
import './App.css';
import { db } from './firebase-config'
import { collection, getDocs, addDoc, deleteDoc, doc, query, where } from 'firebase/firestore'

function App() {
  // const [newEmail, setNewEmail] = useState("")
  // const [newName, setNewName] = useState("")
  // const [users, setUsers] = useState([])
  // const usersCollectionRef = collection(db, "users")
  const parksCollectionRef = collection(db, "parkAttractions")
  const attractionCollectionRef = collection(db, "parkAttractions")
  const [parks, setParks] = useState([])
  const [attractions, setAttractions] = useState([])

  // const createUser = async () => {

  //   let newUser = {email: newEmail, firstName: newName}
  //   await addDoc(usersCollectionRef, newUser)
  //   setUsers([...users, newUser])
  // }

  // const deleteUser = async (id) => {
  //   const userDoc = doc(db, "users", id)
  //   await deleteDoc(userDoc)
  // }

  useEffect(() => {

    const getParks = async () => {
      const parkData = await getDocs(parksCollectionRef);
      const attractionData = await getDocs(attractionCollectionRef)
      setParks(parkData.docs.map((doc) =>({...doc.data()})));
      setAttractions(attractionData.docs.map((doc) =>({...doc.data()})))
    }

    getParks()
    console.log(attractions)
  })


  return (
    <div className="App">
      {/* <input type="email" placeholder="Email..." onChange={(e) => {setNewEmail(e.target.value)}}/>
      <input placeholder="First Name..." onChange={(e) => {setNewName(e.target.value)}}/>
      <button type="submit" onSubmit={(event) => {event.preventDefault(); createUser()}} onClick={createUser}>Create User</button> */}

      {parks.map((park) => {
        return (
          <div key={park.id}>
            <h1 key={`email${park.slug}`}>Slug: {park.slug}</h1>
            <h2 key={`name${park.name}`}>Name: {park.name}</h2>
            <h2 key={`name${park.entityType}`}>Type: {park.entityType}</h2>
          </div>
        );
      })}
    </div>
  );
}

export default App;
