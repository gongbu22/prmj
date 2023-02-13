import React from 'react'
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import './ListModule.css';

function ModalExampleModal({admin}) {
  
  let navigate = useNavigate();
  
    //delete
   const listDelete=(e)=>{
        const star = e.target.name;
        
        
            axios.get("http://3.38.26.169:3001/adminDelete?star="+star).then((res) => {
                console.log(res.data)
                
            });
      alert("교육과정이 삭제되었습니다.")
      
      navigate("/admin")
      window.location.reload()

    } 
    
    //approve
    const approve = (e)=> {
      const approveStar = e.target.name;
      
      axios.get("http://3.38.26.169:3001/Approve?approveStar="+approveStar).then((res)=> {
        console.log(res.data)
      })
      
      alert("교육과정이 승인되었습니다.")
      
      navigate("/admin")
      window.location.reload() // 새로고침 내장함수 추가!
    }
    
    //noApprove
    const noApprove = (e)=> {
      const noApproveStar = e.target.name;
      
      axios.get("http://3.38.26.169:3001/noApprove?noApproveStar="+noApproveStar).then((res)=> {
        console.log(res.data)
      })
      
      alert("교육과정이 승인취소되었습니다.")
      
      navigate("/admin")
      window.location.reload() // 새로고침 내장함수 추가!
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
                <th className="yesOrNo">승인여부</th>
                <th className="approve">교육과정승인</th>
                <th className="delete">교육과정삭제</th>
        </tr>
       {admin.map((f)=> (
              <tr key={f.EDU_CODE}>
                <td>{f.EDU_CODE}</td>
                <td>{f.WEBSITE_LIST}</td>
                <td>{f.COURSE_NAME}</td>
                <td>{f.COURSE_DURATION}</td>
                <td>{f.ID}</td>
                
                <td><Link to={"/adminDetail"} state={{
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
                <td>{f.PUBLICITY==="YES" ? <p>승인</p>:<p>승인요청중</p>}</td>
                <td><input type='button' name={f.EDU_CODE} value={f.PUBLICITY==="YES"? "승인취소": "승인하기"} onClick={f.PUBLICITY==="YES"? noApprove: approve} className="listbutton"></input></td>
                <td><input type='button' name={f.EDU_CODE} value='삭제' onClick={listDelete} className="listbutton"></input></td>
              </tr>
     ))}
     </table>
    </div>
  )
}

export default ModalExampleModal
