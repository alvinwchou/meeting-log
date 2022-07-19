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
import { auth } from './firebase';
import { onAuthStateChanged, signOut, updateProfile } from 'firebase/auth';
import firebase from './firebase';
import { getDatabase, ref, onValue, push } from 'firebase/database';



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
        // setUser({
        //   'user': currentUser,
        //   'displayName': currentUser.displayName,
        //   'userID': currentUser.uid,
        // })

        const database = getDatabase(firebase);
        const dbRef = ref(database, `meetings/${currentUser.uid}`);
        onValue(dbRef, res => {
          const data = res.val();
          let meetingsList = [];

          for(let item in data) {
            meetingsList.push({
              meetingId: item,
              meetingName: data[item].meetingName
            })
          }

          setUser({
            'user': currentUser,
            'displayName': currentUser.displayName,
            'userID': currentUser.uid,
            'meetings': meetingsList,
            'howManyMeetings': meetingsList.length
          })
        })
      } else {
        setUser({...user, 'user': null})
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
      }).then( () => {
        setUser({
          'user': currentUser,
          'displayName': currentUser.displayName,
          'userID': currentUser.uid,
        })
      })
      navigate('/meetings')
    })
  }
    console.log('userState', user)
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

  const addMeeting = (meetingName) => {
    const database = getDatabase(firebase);
    const dbRef = ref(database, `meetings/${user.user.uid}`)
    push(dbRef, {'meetingName': meetingName})
  }

  return (
    <>
      <Navigation user={user.user} logoutUser={logoutUser}/>
      {user.user && <Welcome userName={user.displayName} logoutUser={logoutUser} /> }

      <Routes>
        <Route path='/' element={<Home user={user.user} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/meetings' element={<Meetings addMeeting={addMeeting} meetings={user.meetings} />} />
        <Route path='/register' element={<Register registerUser={registerUser} />} />
      </Routes>
      
    </>
  );
}

export default App;
