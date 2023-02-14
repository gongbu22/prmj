import axios from 'axios';
import { useState } from "react";

function Favourite(props) {
    const {star, websiteList, courseName}=props
    const user = JSON.parse(localStorage.getItem("USER"));
    const [codedata, setCodedata] = useState("");

    const submit=(e)=>{
        const star = e.target.name;
        console.log(user.ID)
        // console.log(star, websiteList, courseName, user)
        // axios.get("http://3.38.26.169:3001/cardfavouritefind?star2="+star).then((res) => {
        //     // console.log(res.data[0]['EDU_CODE'])
        //     setCodedata(res.data[0]['EDU_CODE'])
        //     console.log(codedata)
        // })
        
        // if (star ==codedata) {
        //     alert("이미 저장되었습니다.")
        // }else{
        axios.get("http://3.38.26.169:3001/cardfavourite?star="+star+"&ID="+ user.ID+"&websiteList="+websiteList+"&courseName="+courseName).then((res) => {
            console.log(res.data)
        })
        
        alert("관심과정에 추가되었습니다.")
        // }
    }
    
    return(
        <div>
        <form>
        <input type='button' value={"관심과정추가"} name={star} onClick={submit} style={{float: 'right'}} ></input>
        </form>
        </div>
    )
}

export default Favourite;