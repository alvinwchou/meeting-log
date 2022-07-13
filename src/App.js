import './App.css';
import { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.css'
import Home from './Home';
import Welcome from './Welcome';
import Navigation from './Navigation';
import { Routes, Route } from 'react-router-dom'
import Login from './Login';
import Meetings from './Meetings';
import Register from './Register';
import { getDatabase, onValue, ref } from 'firebase/database';
import firebase, { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';



function App() {

  const [user, setUser] = useState({
    user: null,
    displayName: null,
    userID: null,
  })

  useEffect(()=>{
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    onValue(dbRef, res => {
      const data = res.val();
      console.log(data)
      setUser(data)
    })
  }, [])

  const registerUser = (userName) => {
    console.log('registerUser')
    onAuthStateChanged(auth, currentUser => { 
      console.log(currentUser)
      setUser({
        'user': currentUser,
        'displayName': userName,
        'userID': currentUser.uid,
      })
    })
  }

  return (
    <>
      <Navigation user={user} />
      { user && <Welcome user={user.displayName} /> }

      <Routes>
        <Route path='/' element={<Home user={user} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/meetings' element={<Meetings />} />
        <Route path='/register' element={<Register registerUser={registerUser} />} />
      </Routes>
      
    </>
  );
}

export default App;
