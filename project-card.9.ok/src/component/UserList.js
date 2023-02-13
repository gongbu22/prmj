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
      <div>
      <table border='1'>
        <tr>
                <th>번호</th>
                <th>사이트명</th>
                <th>교육과정명</th>
                <th>과정기간</th>
                <th>작성자</th>
                <th>상세보기</th>
                <th>수정하기</th>
                <th>삭제하기</th>
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
                    <button>상세보기</button>
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
                    <button>수정하기</button>
                    </Link>:"수정불가"}</td>
                    
                    <td>{f.PUBLICITY==="NO"?<input type='button' name={f.EDU_CODE} value={"삭제"} onClick={listDelete }></input>:"삭제불가"}</td>
                </tr>
           
         
     ))}
     </table>
     </div>
  );
}

export default App;