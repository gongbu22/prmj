import React from 'react';
import { useLocation, Link, useNavigate } from "react-router-dom"; // 추가된 부분
import { useState } from "react";
import axios from "axios";
import './DetailModule.css';

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
  
  let navigate = useNavigate();
  
  //수정
    
    const [websiteList, setwebsiteList] = useState(WEBSITE_LIST);
    const [courseName, setcourseName] = useState(COURSE_NAME);
    const [beginDate, setbeginDate] = useState(BEGIN_DATE);
    const [courseDuration, setcourseDuration] = useState(COURSE_DURATION);
    const [description, setdescription] = useState(DESCRIPTION);
    const [website, setwebsite] = useState(WEBSITE);
    const [id, setid] = useState(ID);

    const handlewebsiteList = (e) => {
        setwebsiteList(e.target.value)
        console.log(websiteList)
    }
    
    const handlecourseName = (e) => {
        setcourseName(e.target.value)
    }
    const handlebeginDate = (e) => {
        setbeginDate(e.target.value)
    }
    const handledescription = (e) => {
        setdescription(e.target.value)
    }
    const handlewebsite = (e) => {
        setwebsite(e.target.value)
    }
    const handleid = (e) => {
        setid(e.target.value)
    }
    const handlecourseDuration = (e) => {
        setcourseDuration(e.target.value)
    }
    
    const saveClick = (e) => {
        e.preventDefault();
        
        let body={
            EDU_CODE,
            websiteList,
            courseName,
            beginDate,
            courseDuration,
            description,
            website
        }
        console.log(body)
        
        
          axios
              .post("http://3.38.26.169:3001/userUpdate", body)
              .then((res) => console.log(res));
              
        alert("수정되었습니다. 관리자의 승인을 기다려주세요.")
        navigate("/user")
      window.location.reload()
        
    }
    
    
    return (
        <div className="detailPageBox">
            <ul className="detailPage">
                <form onSubmit={saveClick} >
                        <li className="list"><p className="a">번호: </p><p className="b">{EDU_CODE}</p></li>
                        <li className="list"><p className="a">사이트명: </p><p className="b"><input className="input" defaultvalue={websiteList} placeholder= {websiteList} onChange={handlewebsiteList}></input></p></li>
                        <li className="list"><p className="a">교육과정명: </p><p className="b"><input className="input" defaultvalue={courseName} placeholder= {courseName} onChange={handlecourseName}></input></p></li>
                        <li className="list"><p className="a">과정일정: </p><p className="b"><input className="input" defaultvalue={beginDate} placeholder= {beginDate} onChange={handlebeginDate}></input></p></li>
                        <li className="list"><p className="a">수강기간: </p><p className="b"><input className="input" defaultvalue={courseDuration} placeholder= {courseDuration} onChange={handlecourseDuration}></input></p></li>
                        <li className="list"><p className="a">설명: </p><p className="b "><input className="userUpdateDescription" defaultvalue={description} placeholder= {description} onChange={handledescription}></input></p></li>
                        <li className="list listWEBSITE"><p className="a">주소: </p><p className="b"><input className="input" defaultvalue={website} placeholder= {website} onChange={handlewebsite}></input></p></li>
                        <li className="list"><p className="a">작성자: </p><p className="b"><input className="input" defaultvalue={id} placeholder= {id} onChange={handleid}></input></p></li>
                    <li className="list"><button type="submit" className="listUpdate listbutton">수정완료</button></li>
                </form>
                <li className="list"><Link to={"/user"}><button className="listDelete listbutton">닫기</button></Link></li>
            </ul>
        </div>
    )
}
export default TestDetail