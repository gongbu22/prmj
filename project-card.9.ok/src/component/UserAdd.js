import {React, useState } from "react";
import axios from "axios";
import './UserAddModule.css';

const UserAdd =() => {
    
    //변수선언
    const [Name, SetName] = useState("");
    const [BeginDate, SetBeginDate] = useState("");
    const [EndDate, SetEndDate] = useState("");
    const [Place, SetPlace] = useState("");
    const [Host, SetHost] = useState("");
    const [Region, SetRegion] = useState("");
    const [Account, SetAccount] = useState("");
    const [Category, SetCategory] = useState("");

  //값넣기
  
  const nameHandler = (e) => {
    e.preventDefault();
    SetName(e.target.value);
  };
  const beginHandler = (e) => {
    e.preventDefault();
    SetBeginDate(e.target.value);
  };
  const endHandler = (e) => {
    e.preventDefault();
    SetEndDate(e.target.value);
  };
  const placeHandler = (e) => {
    e.preventDefault();
    SetPlace(e.target.value);
  };
  const hostHandler = (e) => {
    e.preventDefault();
    SetHost(e.target.value);
  };
  const regionHandler = (e) => {
    e.preventDefault();
    SetRegion(e.target.value);
  };
  const accountHandler = (e) => {
    e.preventDefault();
    SetAccount(e.target.value);
  };
  const categoryHandler = (e) => {
    e.preventDefault();
    SetCategory(e.target.value);
  };
  
  

  const submitHandler = (e) => {
    e.preventDefault();
    // state에 저장한 값을 가져옵니다.
   console.log(Name)

    let body = {
      name: Name,
      beginDate: BeginDate,
      endDate: EndDate,
      place: Place,
      host: Host,
      region: Region,
      account: Account,
      category: Category,
    };

    axios
      .post("http://3.38.26.169:3001/add", body)
      .then((res) => console.log(res));
      
    alert("행사가 등록되었습니다. 승인을 기다려주세요.")
    
    reset();
  };
  
  const reset = (e) => {
    SetName("");
    SetBeginDate("");
    SetEndDate("");
    SetPlace("");
    SetHost("");
    SetRegion("");
    SetAccount("");
    SetCategory("");
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
              <label><b>행사이름 :  </b></label>
              <input type="text" value={Name} onChange={nameHandler} className="input"></input>
            </div>
            <div className='topMiddle'>
              <label><b>시작날짜 :  </b></label>
              <input type="text" value={BeginDate} onChange={beginHandler} className="input"></input>
            </div>
            <div className='topBottom'>
              <label><b>종료날짜 :  </b></label>
              <input type="text" value={EndDate} onChange={endHandler} className="input"></input>
            </div>
          </div>
          <div className='middle'>
            <div className='middleTop'>
              <label><b>장소 :  </b></label>
              <input type="text" value={Place} onChange={placeHandler} className="input place"></input>
            </div>
            <div className='middleMiddle'> 
              <label><b>주최:  </b></label>
              <input type="text" value={Host} onChange={hostHandler} className="input"></input>
            </div>
            <div className='middleBottom'>
              <label><b>지역:  </b></label>
              <input type="text" value={Region} onChange={regionHandler} className="input"></input>
            </div>
          </div>
          <div className='bottom'>
            <div className='bottomTop'>
              <label><b>설명 :  </b></label>
              <input type="text" value={Account} onChange={accountHandler} className="input account"></input>
            </div>
            <div className='bottomMiddle'>
              <label><b>카테고리:  </b></label>
              <input type="text" value={Category} onChange={categoryHandler} className="input"></input>
            </div>
          </div>
            <div className='bottomBottom'>
                <button type="submit" className='okButton'><b>등록</b></button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default UserAdd;