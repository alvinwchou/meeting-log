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
import firebase from './firebase';



function App() {

  const [user, setUser] = useState(null)

  useEffect(()=>{
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    onValue(dbRef, res => {
      const data = res.val();
      console.log(data)
      setUser(data.user)
    })
  }, [])

  return (
    <>
      <Navigation user={user} />
      { user && <Welcome user={user} /> }

      <Routes>
        <Route path='/' element={<Home user={user} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/meetings' element={<Meetings />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      
    </>
  );
}

export default App;
