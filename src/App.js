
import { useEffect,useState } from "react";
import { Route } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Home from './components/Home';
import Login from './components/Login';
import Logout from "./components/Logout";
import MyRoutines from './components/MyRoutines';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Routines from './components/Routines';
import BASE_URL from "./util";


function App() {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);


  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      setToken(token);
      const resp = await fetch(`${BASE_URL}/users/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const info = await resp.json();
      
      console.log(info)
      setUser({id: info.id, username: info.username});
    };
    fetchUser();
  }, [token]);

  return (
    <div>
      <Navbar user={user}/> 
        <Route exact path="/">
          <Home user={user}/>
        </Route>
        <Route path="/activities">
          <Activities token={token}
          user={user}
          />
          </Route>
        <Route path="/login">
          <Login user={user}
          setUser={setUser}
          token={token}
          setToken={setToken} />
          </Route>
        <Route path="/my-routines">
          <MyRoutines token={token}
          user={user}/>
          </Route>
        <Route path="/register">
          <Register setToken={setToken} />
          </Route>
        <Route path="/routines">
          <Routines user={user}
          setUser={setUser}
          token={token}
          setToken={setToken}
          />
          </Route>
    <Route path="/logout">
      <Logout token={token}/>
    </Route>
     
    </div>
  );
}

export default App;
