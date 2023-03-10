import axios from 'axios';
import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';

function Favourite(props) {
    
    let navigate = useNavigate();
    
    const {star, websiteList, courseName}=props
    const user = JSON.parse(localStorage.getItem("USER"));
    const [codedata, setCodedata] = useState("");
    const [test, setTest] = useState("");
    
    const isAuthenticated = user !== null;
  

useEffect(() => {
        axios.get("http://3.38.26.169:3001/cardfavouritefind?star2="+star).then((res) => {
              
                setCodedata(res.data[0]['EDU_CODE'])
                console.log(codedata)
            });
}, []);

    const submit=(e)=>{
        
        const star3 = e.target.name;
    
            axios.get("http://3.38.26.169:3001/cardfavourite?star="+star3+"&ID="+ user.ID+"&websiteList="+websiteList+"&courseName="+courseName).then((res) => {
                console.log(res.data)
                setTest(res.data)
                console.log(test)
            })
        
            alert("관심과정에 추가되었습니다.")
            navigate("/")
      
            
        }
        
    

    return(
        <div>
        <form>
        <div>
        {isAuthenticated && 
        <input type='button' value="관심과정추가" name={star} onClick={submit} style={{float: 'right'}} className="listbutton"></input>
        }
        </div> </form>
        </div>
    )
}

export default Favourite;