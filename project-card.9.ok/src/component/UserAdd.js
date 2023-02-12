import {React, useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import {Link } from "react-router-dom"

const TestAdd =() => {
    let navigate = useNavigate();
    //변수선언
    const [WebsiteList, SetWebsiteList] = useState("");
    const [CourseName, SetCourseName] = useState("");
    const [BeginDate, SetBeginDate] = useState("");
    const [CourseDuration, SetCourseDuration] = useState("");
    const [Description, SetDescription] = useState("");
    const [Website, SetWebsite] = useState("");

  //값넣기
  
  const WebsiteListHandler = (e) => {
    e.preventDefault();
    SetWebsiteList(e.target.value);
  };
  const CourseNameHandler = (e) => {
    e.preventDefault();
    SetCourseName(e.target.value);
  };
  const BeginDateHandler = (e) => {
    e.preventDefault();
    SetBeginDate(e.target.value);
  };
  const CourseDurationHandler = (e) => {
    e.preventDefault();
    SetCourseDuration(e.target.value);
  };
  const DescriptionHandler = (e) => {
    e.preventDefault();
    SetDescription(e.target.value);
  };
  const WebsiteHandler = (e) => {
    e.preventDefault();
    SetWebsite(e.target.value);
  };
 
  

  const submitHandler = (e) => {
    e.preventDefault();
    // state에 저장한 값을 가져옵니다.
   
   let body = {
      WEBSITE_LIST:WebsiteList ,
      COURSE_NAME:CourseName ,
      BEGIN_DATE:BeginDate ,
      COURSE_DURATION:CourseDuration,
      DESCRIPTION:Description,
      WEBSITE:Website
    };


    axios
      .post("http://3.38.26.169:3001/add", body)
      .then((res) => console.log(res));
      
    alert("행사가 등록되었습니다. 승인을 기다려주세요.")
    navigate("/")
    window.location.reload()
    
    reset();
  };
  
  
  const reset = (e) => {
    SetWebsiteList("");
    SetCourseName("");
    SetBeginDate("");
    SetCourseDuration("");
    SetDescription("");
    SetWebsite("");
  }
  


  return (
    <div className='modalboss'>
      <div className='modalcontents'>
        <form
          onSubmit={submitHandler}
          style={{ display: "flex", flexDirection: "Column" }}
          >
          <div className='top'>
            <div className='topTop'>
              <label><b>사이트명 :  </b></label>
              <input type="text" value={WebsiteList} onChange={WebsiteListHandler} className="input"></input>
            </div>
            <div className='topMiddle'>
              <label><b>교육과정명 :  </b></label>
              <input type="text" value={CourseName} onChange={CourseNameHandler} className="input"></input>
            </div>
            <div className='topBottom'>
              <label><b>교육과정수업날 :  </b></label>
              <input type="text" value={BeginDate} onChange={BeginDateHandler} className="input"></input>
            </div>
          </div>
          <div className='middle'>
            <div className='middleTop'>
              <label><b>교육과정기간 :  </b></label>
              <input type="text" value={CourseDuration} onChange={CourseDurationHandler} className="input place"></input>
            </div>
            <div className='middleMiddle'> 
              <label><b>교육과정 설명:  </b></label>
              <input type="text" value={Description} onChange={DescriptionHandler} className="input"></input>
            </div>
            <div className='middleBottom'>
              <label><b>사이트주소:  </b></label>
              <input type="text" value={Website} onChange={WebsiteHandler} className="input"></input>
            </div>
          </div>
            <div className='bottomBottom'>
                <button type="submit" className='okButton'><b>등록</b></button>
            </div>
            <Link to={"/user"}><button>닫기</button></Link>
        </form>
      </div>
    </div>
  );
};

export default TestAdd;