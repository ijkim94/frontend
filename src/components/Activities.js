import { useEffect, useState } from "react"
import BASE_URL from "../util";


const Activities=(props)=>{
    console.log(props)
const [activities,setActivities]=useState([]);
const [errorMessage,setErrorMessage]=useState("");
const [name,setName]=useState("");
const [description,setDescription]=useState("")
const [isPublic,setIsPublic]=useState(true)



const fetchActivities = async ()=>{
    const resp = props.token ? await fetch(`${BASE_URL}/activities`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${props.token}`,
        },
      }) : await fetch(`${BASE_URL}/activities`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const info = await resp.json()
      console.log(info)
      setActivities(info)
}


const handleSubmit= async (e)=>{
    e.preventDefault()

    const resp = await fetch(`${BASE_URL}/activities`, {
        method: "POST",
        headers:{

            "Content-Type": "application/json",
            Authorization: `Bearer ${props.token}`,
        },
        body: JSON.stringify({
           name,
           description,
           
        
        })
      })
const info=await resp.json()

console.log(info)
if(info.error){
    setErrorMessage(info.error)
    return
}
setErrorMessage("")
setActivities([info, ...activities])
setName("")
setDescription("")
setIsPublic(true)

}

useEffect(()=>{
fetchActivities()
},[])

    return (<div>
        <h1>
            Routines
        </h1>
        {props.user && props.token && <div>
        <form onSubmit={handleSubmit}>
            <h1>Create Activity</h1>
            <label> Name
                <input type="text"
              placeholder="Activity Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required></input>
            </label>
            <label> Description
                <input type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required></input>
            </label>
            <div>
            <button className="button" ><span> Create Activity </span></button>
            </div>
        </form>
            {errorMessage && <p>{errorMessage}</p>}
    </div>}
        
        <div>{activities.map((activity) => (
        <div className="routineBox">
          <h2 className={activity.id}>{activity.name}</h2>
          <p>{activity.description}</p>
          
        </div>
        
      ))}
      
      </div>
        </div>)
}

export default Activities