import React from 'react';
import { useLocation, Link } from "react-router-dom"; // 추가된 부분
import { MdClose } from 'react-icons/md';

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
        <div className="detailPageBox">
             <ul className="detailPage">
              <li className="list"><Link to={"/favourite"}><button className="deletebutton"><MdClose/></button></Link></li>
                <li className="list"><p className="a">사이트명:</p> <p className="b">{WEBSITE_LIST}</p></li>
                <li className="list"><p className="a">교육과정명:</p> <p className="b"> {COURSE_NAME}</p></li>
                <li className="list"><p className="a">과정일정: </p> <p className="b">{BEGIN_DATE}</p></li>
                <li className="list"><p className="a">수강기간: </p> <p className="b">{COURSE_DURATION}</p></li>
                <li className="list"><p className="a">설명:</p> <p className="b bDESCRIPTION"> {DESCRIPTION}</p></li>
                <li className="list listWEBSITE"><p className="a">주소:</p> <p className="b"> <a href={WEBSITE}>{WEBSITE}</a></p></li>
                <li className="list"><p className="a">작성자:</p> <p className="b"> {ID}</p></li>
            </ul>
        </div>
    )
}
export default TestDetail