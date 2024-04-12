import React ,{useState,useContext} from 'react'
import "./SignIn.css"
import logo from "../img/logo.png"
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoginContext } from '../context/LoginContext';
export default function SignIn() {

    const {setUserLogin} = useContext(LoginContext)

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("")
    //Email Regex
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    //Toast function for errors

    const notifyError = (msg)=> toast.error(msg);
    const notifyB = (msg)=> toast.success(msg);
    const navigate = useNavigate();
    const postData = ()=>{      
        if(!emailRegex.test(email)){
          return  notifyError("Email is not valid!")
        }
        fetch("http://localhost:5000/signin",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            email:email,
            password:password
          })
        }).then(res=>res.json())
        .then(data=>{
          if(data.error) {
            notifyError(data.error);
          }
          else {
            notifyB("Signed in Successfully");
            localStorage.setItem("jwt",data.token)
            localStorage.setItem("user",JSON.stringify(data.user))
            
            navigate("/")
          }
    
          console.log(data)
        })
    
      }
    
      


  return (
    <div className='signIn'>
        <div>
            <div className="loginForm">
            <img className="signUpLogo" src={logo} alt="" />
            <div>
                <input type="email" name="email" id="email" placeholder='Email' value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
            </div>
            <div>
                < input type="password" name="password" id="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
            </div>
            <input type="submit" value="Sign In" id="login-btn" onClick={()=>{postData()}}></input>
            </div>

            <div className="loginForm2">
                Don't have an account?
                <Link to="/signup">
                <span style={{color:"blue",cursor:"pointer"}}>Sing Up</span></Link>
            </div>
        </div>
    </div>
  )
}
