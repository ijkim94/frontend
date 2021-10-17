const Home=(props)=>{
    return (<div>
         {!props.user && <h1>Workout! Burnout!</h1>}
      {props.user && (
        <h1> Let's Workout {props.user.username}!</h1>
      )}
    </div>)
}

export default Home