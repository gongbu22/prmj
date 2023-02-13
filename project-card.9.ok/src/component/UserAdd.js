import {React, useState } from "react";
import axios from "axios";
import {useNavigate, useLocation} from 'react-router-dom';
import {Link } from "react-router-dom"
import { MdClose } from 'react-icons/md';

const TestAdd =() => {
    let navigate = useNavigate();
    //변수선언
    const [WebsiteList, SetWebsiteList] = useState("");
    const [CourseName, SetCourseName] = useState("");
    const [BeginDate, SetBeginDate] = useState("");
    const [CourseDuration, SetCourseDuration] = useState("");
    const [Description, SetDescription] = useState("");
    const [Website, SetWebsite] = useState("");
    const location = useLocation();
    const ID = location.state?.id;


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
  console.log(ID)
   
  let body = {
      WEBSITE_LIST:WebsiteList ,
      COURSE_NAME:CourseName ,
      BEGIN_DATE:BeginDate ,
      COURSE_DURATION:CourseDuration,
      DESCRIPTION:Description,
      WEBSITE:Website,
      ID:ID,
    };


    axios
      .post("http://3.38.26.169:3001/add", body)
      .then((res) => console.log(res));
      
    alert("행사가 등록되었습니다. 승인을 기다려주세요.")
    navigate("/user")
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
    <div className="detailPageBox">
            <ul className="detailPage">
        <form
          onSubmit={submitHandler}
          style={{ display: "flex", flexDirection: "Column" }}
          className="userAddForm"
          >
          <Link to={"/user"}><button className="deletebutton"><MdClose/></button></Link>
            <li className="list"><p className="a">사이트명: </p><p className="b"><input placeholder= "사이트명을 입력해주세요." className="input" onChange={WebsiteListHandler}></input></p></li>
            <li className="list"><p className="a">교육과정명: </p><p className="b"><input placeholder="교육과정명을 입력해주세요." className="input" onChange={CourseNameHandler}></input></p></li>
            <li className="list"><p className="a">과정일정: </p><p className="b"><input placeholder="평일반/주말반 주별 횟수를 입력해주세요. ex) 평일반 주 2회" className="input"  onChange={BeginDateHandler}></input></p></li>
            <li className="list"><p className="a">수강기간: </p><p className="b"><input placeholder="수강기간을 입력해주세요. ex) 6개월" className="input" onChange={CourseDurationHandler}></input></p></li>
            <li className="list"><p className="a">설명: </p><p className="b "><input placeholder="교육과정에 대한 자세한 설명을 입력해주세요." className="userUpdateDescription"  onChange={DescriptionHandler}></input></p></li>
            <li className="list"><p className="a">주소: </p><p className="b"><input placeholder="교육과정의 해당사이트 주소를 입력해주세요." className="input" onChange={WebsiteHandler}></input></p></li>
            <div className='bottomBottom'>
            <button type="submit" className='okButton listbutton addRegistButton'><b>등록</b></button>
            </div>
        </form>
      </ul>
    </div>
  );
};

export default TestAdd;