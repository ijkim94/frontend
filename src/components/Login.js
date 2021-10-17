import { useState } from "react"
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import BASE_URL from "../util";


const Login=(props)=>{
const [username,setUsername]=useState("");
const [password,setPassword]=useState("");
const [errorMessage,setErrorMessage] = useState("")
const history = useHistory()

const handleSubmit= async(e)=>{
e.preventDefault();
console.log(username,password)
setErrorMessage("");

const resp = await fetch(`${BASE_URL}/users/login`, {
  method: "POST",
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username,
    password
  })
})

const info = await resp.json();
console.log(info)
if (info.error) {
  setErrorMessage(info.error);
  return;
}
localStorage.setItem("token", info.token);
props.setToken(info.token);
history.push("/")
};

    return (<div>
         <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            placeholder="*Username*"
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            minLength={"8"}
            placeholder="*Password*"
            required
          />
        </div>
        <button className="button" ><span> Login </span></button>
        <div><p><Link to="/register">Don't have an account? Sign up here!</Link></p></div>
        
        <p>{errorMessage}</p>
      </form>
        </div>)
}

export default Login