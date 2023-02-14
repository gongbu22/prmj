import React from 'react';
import { useLocation, Link } from "react-router-dom"; // 추가된 부분
import './DetailModule.css';
import { MdClose } from 'react-icons/md';
import { MdOutlineHome, MdComputer, MdToday, MdOutlineUpdate, MdOutlineDescription, MdOutlineMouse,MdPerson } from 'react-icons/md';

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
            <li className="list"><Link to={"/admin"}><button className="deletebutton"><MdClose/></button></Link></li>
                <li className="list"><p className="adetail"><MdOutlineHome/><b className="detailsizeb">사이트명:</b>{WEBSITE_LIST}</p></li>
                <li className="list"><p className="adetail"><MdComputer/><b className="detailsizeb">교육과정명:</b>{COURSE_NAME}</p></li>
                <li className="list"><p className="adetail"><MdOutlineUpdate/><b className="detailsizeb">과정일정:</b>{BEGIN_DATE}</p></li>
                <li className="list"><p className="adetail"><MdToday/><b className="detailsizeb">수강기간:</b>{COURSE_DURATION}</p></li>
                <li className="list"><p className="adetail"><p><MdOutlineDescription/><b className="detailsizeb">설명:</b></p><p className="bdetailDESCRIPTION">{DESCRIPTION}</p></p></li>
                <li className="list listWEBSITE"><p className="adetail"><MdOutlineMouse/><b className="detailsizeb">주소:</b><a href={WEBSITE}>{WEBSITE}</a></p></li>
                <li className="list"><p className="adetail"><MdPerson/><b className="detailsizeb">작성자:</b>{ID}</p></li>
            </ul>
        </div>
    )
}
export default TestDetail