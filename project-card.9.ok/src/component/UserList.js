import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './ListModule.css';
import axios from 'axios';

function App({list}) {
  
  let navigate = useNavigate();
     //delete
   const listDelete=(e)=>{
        const star = e.target.name;
        
        
            axios.get("http://3.38.26.169:3001/userDelete?star="+star).then((res) => {
                console.log(res.data)
                
            });
      alert("추가한 교육과정이 삭제되었습니다.")
      
      navigate("/user")
      window.location.reload()

    } 
    
  return (
      <div className="tablesize">
      <table border='1'>
        <tr>
                <th className="code">번호</th>
                <th className="websiteList">사이트명</th>
                <th className="courseName">교육과정명</th>
                <th className="courseDuration">과정기간</th>
                <th className="id">작성자</th>
                <th className="detail">상세보기</th>
                <th className="update">수정하기</th>
                <th className="delete">삭제하기</th>
        </tr>
       {list.map((f)=> (
           
                <tr key={f.EDU_CODE}>
                    <td>{f.EDU_CODE}</td>
                    <td>{f.WEBSITE_LIST}</td>
                    <td>{f.COURSE_NAME}</td>
                    <td>{f.COURSE_DURATION}</td>
                    <td>{f.ID}</td>
                    
                    <td><Link to={"/userDetail"} state={{
                    EDU_CODE: f.EDU_CODE,
                    WEBSITE_LIST: f.WEBSITE_LIST,
                    COURSE_NAME: f.COURSE_NAME,
                    BEGIN_DATE: f.BEGIN_DATE,
                    COURSE_DURATION: f.COURSE_DURATION,
                    DESCRIPTION:f.DESCRIPTION,
                    WEBSITE:f.WEBSITE,
                    ID:f.ID
                    }}>
                    <button className="listbutton">상세보기</button>
                    </Link></td>
                    
                    <td>{f.PUBLICITY==="NO"?<Link to={"/userUpdate"} state={{
                    EDU_CODE: f.EDU_CODE,
                    WEBSITE_LIST: f.WEBSITE_LIST,
                    COURSE_NAME: f.COURSE_NAME,
                    BEGIN_DATE: f.BEGIN_DATE,
                    COURSE_DURATION: f.COURSE_DURATION,
                    DESCRIPTION:f.DESCRIPTION,
                    WEBSITE:f.WEBSITE,
                    ID:f.ID
                    }}>
                    <button className="listbutton">수정하기</button>
                    </Link>:"수정불가"}</td>
                    
                    <td>{f.PUBLICITY==="NO"?<input type='button' name={f.EDU_CODE} value={"삭제"} onClick={listDelete } className="listbutton"></input>:"삭제불가"}</td>
                </tr>
           
         
     ))}
     </table>
     </div>
  );
}

export default App;