import {useRef} from "react";
import {Link} from "react-router-dom";
export default function Register(){
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const formSubmit = async e =>{
      e.preventDefault();
      const response = await fetch("http://localhost:5000/api/register",{
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          username:usernameRef.current.value,
          email:emailRef.current.value,
          password:passwordRef.current.value
        })
      })
      const data = await response.json()
      console.log(data);
    }
    return(
        <div>
            <h2>Register</h2>
            <form onSubmit={formSubmit}>
            <input
                type="text"
                placeholder="Username"
                ref={usernameRef}
            /><br/>
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
            <input
                type="password"
                placeholder="Confirm Password"
                ref={confirmPasswordRef}
            /><br/>
            <button type="submit">Submit</button>
            </form>
            <Link to="/login">Login</Link>
        </div>
    )
}