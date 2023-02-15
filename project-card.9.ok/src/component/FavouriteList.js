import React from 'react'
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom"; // 추가된 부분
import './ListModule.css';

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
    <table border='1'>
        <tr>
                <th>번호</th>
                <th>과정종류</th>
                <th>사이트명</th>
                <th>교육과정명</th>
                <th>과정기간</th>
                <th>작성자</th>
                <th>상세보기</th>
                <th>관심과정삭제</th>
        </tr>
       {favourite.map((f)=> (
                <tr key={f.FCOURSE_CODE}>    
                        <td>{f.FCOURSE_CODE}</td>
                        <td>{f.TYPE}</td>
                        <td>{f.WEBSITE_LIST}</td>
                        <td>{f.COURSE_NAME}</td>
                        <td>{f.COURSE_DURATION}</td>
                        <td>{f.ID}</td>
                        
                        <td><Link to={"/favouriteDetail"} state={{
                        EDU_CODE: f.FCOURSE_CODE,
                        WEBSITE_LIST: f.WEBSITE_LIST,
                        COURSE_NAME: f.COURSE_NAME,
                        BEGIN_DATE: f.BEGIN_DATE,
                        COURSE_DURATION: f.COURSE_DURATION,
                        DESCRIPTION:f.DESCRIPTION,
                        WEBSITE:f.WEBSITE,
                        ID:f.ID,
                        TYPE:f.TYPE
                        }}>
                        <button className="listbutton">상세보기</button>
                        </Link></td>
                        <td><input className="listbutton" type="button" name={f.FCOURSE_CODE} value="삭제" onClick={submit}></input></td>
                </tr>
     ))}
    </table>
     </div>
  )
}

export default FavouriteList