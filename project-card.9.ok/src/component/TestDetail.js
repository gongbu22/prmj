import React from 'react';
import { useLocation, Link } from "react-router-dom"; // 추가된 부분

function TestDetail() {
    const location = useLocation(); // 추가된 부분
  const EDU_CODE = location.state?.EDU_CODE;// 추가된 부분
  const WEBSITE_LIST = location.state?.WEBSITE_LIST;
  const COURSE_NAME = location.state?.COURSE_NAME;
  const BEGIN_DATE = location.state?.BEGIN_DATE;
  const DESCRIPTION = location.state?.DESCRIPTION;
  const WEBSITE = location.state?.WEBSITE;
  const ID = location.state?.ID;
  
  
    
    return (
        <div>
        <input value={EDU_CODE}></input>
        <div>{WEBSITE_LIST}</div>
        <div>{COURSE_NAME}</div>
        <div>{BEGIN_DATE}</div>
        <div>{DESCRIPTION}</div>
        <div>{WEBSITE}</div>
        <div>{ID}</div>
        <Link to={"/test2"}><button>닫기</button></Link>
        </div>
    )
}
export default TestDetail