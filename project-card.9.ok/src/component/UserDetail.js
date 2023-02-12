import React from 'react';
import { useLocation, Link } from "react-router-dom"; // 추가된 부분

function TestDetail() {
    const location = useLocation(); // 추가된 부분
  const EDU_CODE = location.state?.EDU_CODE;// 추가된 부분
  const WEBSITE_LIST = location.state?.WEBSITE_LIST;
  const COURSE_NAME = location.state?.COURSE_NAME;
  const BEGIN_DATE = location.state?.BEGIN_DATE;
  const COURSE_DURATION= location.state?.COURSE_DURATION;
  const DESCRIPTION = location.state?.DESCRIPTION;
  const WEBSITE = location.state?.WEBSITE;
  const ID = location.state?.ID;
  
  
    return (
        <div>
            사이트명: {WEBSITE_LIST}
            교육과정명: {COURSE_NAME}
            과정일정: {BEGIN_DATE}
            수강기간: {COURSE_DURATION}
            설명: {DESCRIPTION}
            주소: <a href={WEBSITE}>{WEBSITE}</a>
            굴쓴이: {ID}
        <Link to={"/user"}><button>닫기</button></Link>
        </div>
    )
}
export default TestDetail