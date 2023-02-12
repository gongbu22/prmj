import React from 'react'
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

function ModalExampleModal({admin}) {
  
  let navigate = useNavigate();
  
    //delete
   const listDelete=(e)=>{
        const star = e.target.name;
        
        
            axios.get("http://3.38.26.169:3001/adminDelete?star="+star).then((res) => {
                console.log(res.data)
                
            });
      alert("삭제되었습니다.")
      
      navigate("/admin")
      window.location.reload()

    } 
    
    //approve
    const approve = (e)=> {
      const approveStar = e.target.name;
      
      axios.get("http://3.38.26.169:3001/Approve?approveStar="+approveStar).then((res)=> {
        console.log(res.data)
      })
      
      alert("승인되었습니다.")
      
      navigate("/admin")
      window.location.reload() // 새로고침 내장함수 추가!
    }
    
    //noApprove
    const noApprove = (e)=> {
      const noApproveStar = e.target.name;
      
      axios.get("http://3.38.26.169:3001/noApprove?noApproveStar="+noApproveStar).then((res)=> {
        console.log(res.data)
      })
      
      alert("승인취소되었습니다.")
      
      navigate("/admin")
      window.location.reload() // 새로고침 내장함수 추가!
    }

  return (
     <div>
       {admin.map((f)=> (
           <div>
                <div key={f.EDU_CODE} >
                    사이트명: <p>{f.WEBSITE_LIST}</p>
                    교육과정명: <p>{f.COURSE_NAME}</p>
                    과정기간: <p>{f.COURSE_DURATION}</p>
                    작성자: <p>{f.ID}</p>
                    <div>{f.PUBLICITY==="YES" ? <p>승인</p>:<p>승인요청중</p>}</div>
                    
                    <Link to={"/adminDetail"} state={{
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
                    </Link>
                    <input type='button' name={f.EDU_CODE} value='삭제' onClick={listDelete}></input>
                    <input type='button' name={f.EDU_CODE} value={f.PUBLICITY==="YES"? "승인취소": "승인하기"} onClick={f.PUBLICITY==="YES"? noApprove: approve}></input>
                </div>
           
            </div>
     ))}
    </div>
  )
}

export default ModalExampleModal
