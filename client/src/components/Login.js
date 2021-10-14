import {useRef} from "react";
import {Link, useHistory} from "react-router-dom";

export default function Login(){
    const emailRef = useRef();
    const passwordRef = useRef();
    const history = useHistory();
    const formSubmit = async e =>{
      e.preventDefault();
      const response = await fetch("/api/login",{
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          email:emailRef.current.value,
          password:passwordRef.current.value
        })
      })
      const data = await response.json()
      if(data.user){
        alert("Login Successful");
        localStorage.setItem("token",data.user);
        history.replace("/dashboard");
      }else{
        alert("Please check details");
      }
    }
    return(
        <div>
            <h2>Login</h2>
            <form onSubmit={formSubmit}>
            <input
                type="email"
                placeholder="Email"
                ref={emailRef}
            /><br/>
            <input
                type="password"
                placeholder="Password"
                ref={passwordRef}
            /><br/>
            <button type="submit">Submit</button>
            </form>
            <Link to="/register">Register</Link>
        </div>
    )
}
