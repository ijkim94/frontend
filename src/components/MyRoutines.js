import { useEffect, useState } from "react"

import BASE_URL from "../util";


const MyRoutines =  (props)=>{
   
    console.log(props)
    const username = props.user.username
    const [routines,setRoutines]= useState([]);
    const [name,setName]=useState("");
    const [goal,setGoal]=useState("");
    const [isPublic,setIsPublic]=useState(true)
    const [activities,setActivities]=useState([]);
    const [errorMessage,setErrorMessage]=useState("");
    const [description,setDescription]=useState("")
    
    const fetchMyStuff = async()=>{
        const resp=await fetch(`${BASE_URL}/users/${username}/routines`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${props.token}`,},
             })
          
          const info=await resp.json()
          console.log(info)
          setRoutines(info)
    }
const handleEdit=async(editId)=>{
    const resp=await fetch(`${BASE_URL}/api/routines/${editId}`, {
        method: "PATCH",
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${props.token}`
          },
        body: JSON.stringify({
          name,
          goal
        })
      })
      const info=await resp.json()
      console.log(info)
      fetchMyStuff(info)
   
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
          fetchMyStuff()
          if(info.error){
            setErrorMessage(info.error)
            return
        }
        setErrorMessage("")
    })
useEffect(()=>{
fetchMyStuff()
},[])

    return (<div>
        {<div>
            <div>{activities.map((activity) => (
        <div className="routineBox">
          <h2 className={activity.id}>{activity.name}</h2>
          <p>{activity.description}</p>
    
        </div>
      ))}
      </div>
            {routines.map((routine) => (
        <div className="routineBox">
          <h2 key={routine.id}>{routine.name}</h2>
          <p>{routine.goal}</p>
          <p>{routine.creatorName}</p>
          <div>
              <div>
               {routine.activities.map((activity)=>{return (
                   <div>
                   <h2 key={activity.id}>Activities</h2>
                   <p>Name: {activity.name}</p>
                   <p>Description: {activity.description}</p>
                   </div>)
               })}   
              </div>
              <div> <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}}></input></div>
              <div>
              {(props.user.username === routine.creatorName)&& <button onClick={()=>handleEdit(routine.id)}>Edit</button>}
           </div>
           {(props.user.username === routine.creatorName)&& <button onClick={()=>handleDelete(routine.id)}>Delete</button>}
</div>
        </div>
      ))}</div>}
    </div>)
}

export default MyRoutines