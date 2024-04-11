import React,{useEffect,useState} from 'react'
import "./Home.css"
import { useNavigate } from 'react-router-dom'
export default function Home() {

  const [data, setData] = useState([])
  const navigate = useNavigate()
  useEffect(()=>{
    const token = localStorage.getItem("jwt")
    if(!token){
      navigate("./signup")
    }

    //Fetching all posts

    fetch("http://localhost:5000/allposts",{
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
    }
    }).then(res=>res.json())
    .then(result=>setData(result))
    .catch(err=>console.log(err))
  },[])
/*
  const likePost=(id)=>{
    fetch("http://localhost:5000/like",{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        Authorization:"Bearer "+ localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        postId:id
      }).then(res=>res.json())
      .then((result)=>{
        console.log(result)
      })
    }
    )
  }

  const unlikePost=(id)=>{
    fetch("http://localhost:5000/unlike",{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        Authorization:"Bearer "+ localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        postId:id
      }).then(res=>res.json())
      .then((result)=>{
        console.log(result)
      })
    }
    )
  }
*/
  return (
    <div className='home'>
      {/** Card  */}
      {data.map((posts)=>{
        return (
          <div className="card" key={posts._id}>
        {/**Card Header */}
        <div className="card-header">
            <div className="card-pic">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoLyku9z5NMcJI903GVWLJU82eaF2x5-UgCA&usqp=CAU" alt="Profile Photo"></img>
            </div>
            <h5>{posts.postedBy.name}</h5>
        </div>
        {/**Card Image */}
        <div className="card-image">
          <img src={posts.photo} alt=""></img>
        </div>
        {/**Card Content */}
        <div className="card-content">
          <span className="material-symbols-outlined" >favorite</span>
          <span className="material-symbols-outlined material-symbols-outlined-red" >favorite</span>
            <p>1 like</p>
            <p>{posts.body}</p>
        </div>
        {/**Card Comment */}
        <div className="add-comment">
          <span className="material-symbols-outlined">mood</span>
          <input type="text"  placeholder='Add Comment'></input>  
          <button className='comment' >Post</button>
        </div>
      </div>
        )
      })}

      
    </div>
  )
}
