import { useState, useEffect } from 'react';
import './App.css';
import { db } from './firebase-config'
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'

function App() {
  const [newEmail, setNewEmail] = useState("")
  const [newName, setNewName] = useState("")
  const [users, setUsers] = useState([])
  const usersCollectionRef = collection(db, "users")

  const createUser = async () => {
    let newUser = {email: newEmail, firstName: newName}
    await addDoc(usersCollectionRef, newUser)
    setUsers([...users, newUser])
  }

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id)
    await deleteDoc(userDoc)
  }

  useEffect(() => {

    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef)
      setUsers(data.docs.map((doc) =>({...doc.data(), id: doc.id})));
    }

    getUsers()
  })


  return (
    <div className="App">
      <input type="email" placeholder="Email..." onChange={(e) => {setNewEmail(e.target.value)}}/>
      <input placeholder="First Name..." onChange={(e) => {setNewName(e.target.value)}}/>
      <button onClick={createUser}>Create User</button>

      {users.map((user) => {
        return (
        <div key={user.id}>
          <h1>Email: {user.email}</h1>
          <h2>First Name: {user.firstName}</h2>
          <button onClick={() => {deleteUser(user.id)}}>Delete {user.firstName}</button>
        </div>
        );
      })}
    </div>
  );
}

export default App;
