import React from 'react';
import { useLocation, Link } from "react-router-dom"; // 추가된 부분
import { useEffect, useState } from "react";
import axios from "axios";

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
        
    }
    
    
    return (
        <div>
        <form onSubmit={saveClick}>
                <input value={EDU_CODE}></input>
                <input defaultvalue={websiteList} placeholder= {websiteList} onChange={handlewebsiteList}></input>
                <input defaultvalue={courseName} placeholder= {courseName} onChange={handlecourseName}></input>
                <input defaultvalue={beginDate} placeholder= {beginDate} onChange={handlebeginDate}></input>
                <input defaultvalue={courseDuration} placeholder= {courseDuration} onChange={handlecourseDuration}></input>
                <div>설명 : <input defaultvalue={description} placeholder= {description} onChange={handledescription}></input></div>
                <input defaultvalue={website} placeholder= {website} onChange={handlewebsite}></input>
                <input defaultvalue={id} placeholder= {id} onChange={handleid}></input>
            <button type="submit">수정완료</button>
        </form>
        <Link to={"/test2"}><button>닫기</button></Link>
        </div>
    )
}
export default TestDetail