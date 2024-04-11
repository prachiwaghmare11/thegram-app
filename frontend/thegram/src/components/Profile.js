import React,{useEffect,useState} from 'react'
import './Profile.css'
export default function Profile() {

   const [pic, setPic] = useState([])
  
  useEffect(() => {
    fetch("http://localhost:5000/myposts",{
      headers:{
        "Authorization": "Bearer "+localStorage.getItem("jwt")
      }
    }).then(res=>res.json())
    .then((result)=>{
      setPic(result)
    })
  }, [])
  
  return (
    <div className="profile">
      <div className="profile-frame">
        <div className="profile-pic">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoLyku9z5NMcJI903GVWLJU82eaF2x5-UgCA&usqp=CAU" alt="Profile Photo"></img>
        </div>
        <div className="profile-data">
          <h1>Prachi</h1>
          <div className="profile-info" style={{display:"flex"}}  >
            <p>40 posts</p>
            <p>50 followers</p>
            <p>20 following</p>
          </div>
        </div>
      </div>

<hr style={
  {
    width:"90%",
    margin:"auto",
    opacity:"0.8",
    margin:"25px auto"
  }
}></hr>
      <div className="profile-gallery">
      {pic.map((pics)=>{
        return <img key={pics._id} src={pics.photo} className='item'></img>
      })}
      </div>
    </div>
  )
}
