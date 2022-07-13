import './App.css';
import { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.css'
import Home from './Home';
import Welcome from './Welcome';
import Navigation from './Navigation';
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './Login';
import Meetings from './Meetings';
import Register from './Register';
import { getDatabase, onValue, ref } from 'firebase/database';
import firebase, { auth } from './firebase';
import { onAuthStateChanged, signOut, updateProfile } from 'firebase/auth';



function App() {

  const [user, setUser] = useState({
    user: null,
    displayName: null,
    userID: null,
  })

  useEffect(()=>{
    // const database = getDatabase(firebase);
    // const dbRef = ref(database);
    // onValue(dbRef, res => {
    //   const data = res.val();
    //   console.log(data)
    //   setUser(data)
    // })

    // update state according to logged in user
    onAuthStateChanged(auth, currentUser => {
      console.log('onpageload');
      if(currentUser) {
        setUser({
          'user': currentUser,
          'displayName': currentUser.displayName,
          'userID': currentUser.uid,
        })
      }
    })
  }, [])

  let navigate = useNavigate()

  const registerUser = (userName) => {
    console.log('registerUser')
    onAuthStateChanged(auth, currentUser => { 
      // add display to the authentication
      updateProfile(auth.currentUser, {
        displayName: userName
      })
      console.log(currentUser)
      setUser({
        'user': currentUser,
        'displayName': currentUser.displayName,
        'userID': currentUser.uid,
      })
      navigate('/meetings')
    })
  }

  const logoutUser = (e) => {
    e.preventDefault()
    setUser({
      user: null,
      displayName: null,
      userID: null,
    })
    signOut(auth).then(() => {
      navigate('/login');
    });
  }

  console.log('ererr', user)

  return (
    <>
      <Navigation user={user.user} logoutUser={logoutUser}/>
      {user.user && <Welcome userName={user.displayName} logoutUser={logoutUser} /> }

      <Routes>
        <Route path='/' element={<Home user={user.user} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/meetings' element={<Meetings />} />
        <Route path='/register' element={<Register registerUser={registerUser} />} />
      </Routes>
      
    </>
  );
}

export default App;
