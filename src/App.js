import './App.css';
import { useState } from "react"
import 'bootstrap/dist/css/bootstrap.css'
import Home from './Home';
import Welcome from './Welcome';
import Navigation from './Navigation';
import { Routes, Route } from 'react-router-dom'
import Login from './Login';
import Meetings from './Meetings';
import Register from './Register';



function App() {

  // const [user, setUser] = useState(null)
  const [user, setUser] = useState('Ray')

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
