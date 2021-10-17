import { useEffect, useState } from "react"
import BASE_URL from "../util";


const Routines=(props)=>{
const [routines,setRoutines]= useState([]);
const [name,setName]=useState("");
const [goal,setGoal]=useState("");
const [isPublic,setIsPublic]=useState(true)
const[errorMessage,setErrorMessage]=useState("")


const fetchRoutine= async()=>{
    const resp= props.token ? await fetch(`${BASE_URL}/routines`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${props.token}`,
        },
      }) : await fetch(`${BASE_URL}/routines`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const info = await resp.json()
      
setRoutines(info)
console.log(info)
}
const handleSubmit= async (e)=>{
    e.preventDefault()

    const resp = await fetch(`${BASE_URL}/routines`, {
        method: "POST",
        headers:{

            "Content-Type": "application/json",
            Authorization: `Bearer ${props.token}`,
        },
        body: JSON.stringify({
           name,
           goal,
        isPublic
        })
      })
const info=await resp.json()

console.log(info)
if(info.error){
    setErrorMessage(info.error)
    return
}
setErrorMessage("")
setRoutines([info, ...routines])
setName("")
setGoal("")
setIsPublic(true)
}
const handleDelete= (async (deleteId)=>{
    const resp = await fetch(`${BASE_URL}/routines/${deleteId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${props.token}`
        }
      })
      const info=await resp.json()
      console.log(info)
      fetchRoutine()
      if(info.error){
        setErrorMessage(info.error)
        return
    }
    setErrorMessage("")
})

useEffect(()=>{
    fetchRoutine()
    },[])

    return (<div>
        <h1>
            Routines
        </h1>
       {props.user && props.token && <div>
        <form onSubmit={handleSubmit}>
            <h1>Create Routine</h1>
            <label> Name
                <input type="text"
              placeholder="Routine Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required></input>
            </label>
            <label> Goal
                <input type="text"
              placeholder="Goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              required></input>
            </label>
            
            <div>
            <button className="button" ><span> Create Routine </span></button>
            </div>
        </form>
            {errorMessage && <p>{errorMessage}</p>}
    </div>}
    
        {<div>
            {routines.map((routine) => (
        <div className="routineBox">
          <h2 key={routine.id}>{routine.name}</h2>
          <p>{routine.goal}</p>
          <p>{routine.creatorName}</p>
          <div>
              
               {routine.activities.map((activity)=>{
                   return (
                   <div key={activity.id}>
                   <h2 key={activity.id}>Activities</h2>
                   <p>Name: {activity.name}</p>
                   <p>Description: {activity.description}</p>
                   </div>)
               })}   
              
           {(props.user.username === routine.creatorName)&& 
           <button onClick={()=>handleDelete(routine.id)}>Delete</button>}
</div>
        </div>
      ))}</div>}
    
        </div>)
}

export default Routines