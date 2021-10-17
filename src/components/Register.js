import { useState } from "react"
import { useHistory } from "react-router";
import BASE_URL from "../util";
import { Link } from "react-router-dom";

const Register=(props)=>{

const [username,setUsername]=useState("");
const [password,setPassword]=useState("");
const [confirmPassword,setConfirmPassword]=useState("");
const [errorMessage,setErrorMessage] = useState("")
const history = useHistory()

const handleSubmit= async(e)=>{
e.preventDefault();
console.log(username,password,confirmPassword)
setErrorMessage("");

const resp = await fetch(`${BASE_URL}/users/register`, {
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

if (info.error) {
  setErrorMessage(info.error);
  return;
}
if (password !== confirmPassword) {
  setErrorMessage("Passwords do not match!");
  return;
}
console.log(info)
localStorage.setItem("token", info.token);

props.setToken(info.token);
history.push("/")
}

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
          <label>Password (9 characters minimum):</label>
          <input
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            minLength={"9"}
            placeholder="*Password*"
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            minLength={"9"}
            placeholder="*Confirm Password*"
            required
          />
        </div>
        <button className="button" ><span> Register </span></button>
        <div>
        <p><Link to="/login">Have an account? Login here!</Link></p>
        </div>
        <p>{errorMessage}</p>
      </form>
        </div>)
}

export default Register