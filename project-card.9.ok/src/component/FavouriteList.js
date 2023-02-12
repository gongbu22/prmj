import React from 'react'
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom"; // 추가된 부분

function FavouriteList({favourite}) {
  
  
  let navigate = useNavigate();
  
  const submit=(e)=>{
        const star = e.target.name;
        
            axios.get("http://3.38.26.169:3001/favouriteDelete?star="+star ).then((res) => {
                console.log(res.data)
                
            });
            
        alert("관심교육과정이 삭제되었습니다.")
      
      navigate("/favourite")
      window.location.reload()
    }
    
  return (
    <div>
       {favourite.map((f)=> (
           <div>
                <div key={f.FCOURSE_CODE} >
                    사이트명: <p>{f.WEBSITE_LIST}</p>
                    교육과정명: <p>{f.COURSE_NAME}</p>
                    과정기간: <p>{f.COURSE_DURATION}</p>
                    작성자: <p>{f.ID}</p>
                    
                    <Link to={"/favouriteDetail"} state={{
                    EDU_CODE: f.FCOURSE_CODE,
                    WEBSITE_LIST: f.WEBSITE_LIST,
                    COURSE_NAME: f.COURSE_NAME,
                    BEGIN_DATE: f.BEGIN_DATE,
                    COURSE_DURATION: f.COURSE_DURATION,
                    DESCRIPTION:f.DESCRIPTION,
                    WEBSITE:f.WEBSITE,
                    ID:f.ID
                    }}>
                    <button>상세보기</button>
                    </Link>
                    <input type="button" name={f.FCOURSE_CODE} value="삭제" onClick={submit}></input>
                </div>
           
            </div>
     ))}
     </div>
  )
}

export default FavouriteList