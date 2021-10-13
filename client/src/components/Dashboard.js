import {useEffect, useState, useRef} from "react";
import jwt from "jsonwebtoken";
import {useHistory} from "react-router-dom";

export default function Dashboard(){
    const history = useHistory();
    const [bio, setBio] = useState();
    const bioRef = useRef();
    async function populateQuote(){
        const req = await fetch("http://localhost:5000/api/bio",{
            headers:{
                "x-access-token": localStorage.getItem("token")
            }
        })
        const data = await req.json();
        if(data.status === "ok"){
            setBio(data.user.bio);        
        }else{
            alert(data.error)
        }
    }
//hostname:ubuntu-s-1vcpu-1gb-fra1-01
//ip address:165.232.116.41
//password:!v+g%L_Vvv3Y9QH
    const formSubmit = async e =>{
        e.preventDefault();
        const req = await fetch("http://localhost:5000/api/bio",{
            method: "POST",
            headers:{
                "Content-Type":"application/json",
                'x-access-token': localStorage.getItem("token")
            },
            body:JSON.stringify({
                bio:bioRef.current.value
            })
        })
        const data = await req.json();
        setBio(data.user.bio)
    }

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token){
            const user = jwt.decode(token);
            console.log(user);
            if(!user){
                localStorage.removeItem("token");
                history.replace("/login");
            }else{
                populateQuote();
            }
        }
    },[])

    return(
        <div className="dashboard">
            Bio: {bio && bio}
            <form onSubmit={formSubmit}>
                <input type="text" placeholder="bio" ref={bioRef}/>
                <button type="submit">Submit</button>    
            </form>
        </div>
    )
}