import './App.css';
import { useState } from "react"
import 'bootstrap/dist/css/bootstrap.css'
import Home from './Home';
import Welcome from './Welcome';
import Navigation from './Navigation';

function App() {

  // const [user, setUser] = useState(null)
  const [user, setUser] = useState('Ray')

  return (
    <>
      <Navigation user={user} />
      { user && <Welcome user={user} /> }
      <Home user={user} />
    </>
  );
}

export default App;
