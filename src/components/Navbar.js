import { Link } from 'react-router-dom';
const Navbar=(props)=>{
    return (<div> 
        <div className="dropdown">
<Link to="/">Home</Link> 
<div class="dropdown-content">
  <Link to="/activities">Activities</Link> 
  <Link to="/routines">Routines</Link> 
  {props.user && <><Link to="/my-routines">My Routines</Link></> }
  </div>
  </div>
  {!props.user && <><Link to="/register">Register</Link> 
  <Link to="/login">Login</Link></>}
  {props.user && <><Link to="/logout">Logout</Link></>}
  
  </div>)
}

export default Navbar