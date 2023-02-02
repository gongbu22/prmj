import axios from "axios";
import { useState } from "react";
import CardList from "./CardList";
import './CardModule.css';
import { MdSearch } from "react-icons/md";



const Cards = () => {
  
 
  const [cards, setCards] = useState([]);
  const [temp, setSearch] = useState([]);


    axios.get("http://3.38.26.169:3001/cardList").then((res) => {
      // console.log(res)
      setCards(res.data);
    });

  const searchHandler = (s) => {
    s.preventDefault();
    setSearch(s.target.value); //입력하는동안 움직임이 있으니깐 setSearch가 작동해서 temp 에 저장된다.
  };

  const submitHandler = (e) => {
    const eventName= e.target.value
    console.log(eventName)
    // axios.get("http://3.38.26.169:3001/cardSearch?searchName="+eventName).then((res) => {
    //   setCards(temp);
      // console.log(temp);
      //setCards(res.data);
      // console.log(cards);
    // });
  };
  
  //category  //eventName이 검색창안으로 들어가게 수정하기
  const searchevent = (e) => {
     e.preventDefault();
    const value= e.target.value
    
    axios.get("http://3.38.26.169:3001/cardSearch?event="+value).then((res) => {
       setCards(res.data);
      console.log(cards); 
    });
  }
  
  

  const card = cards.map((c) => (
    <CardList
      key={c.EVENT_CODE}
      EVENT_CODE={c.EVENT_CODE}
      EVENT_CATEGORY={c.EVENT_CATEGORY}
      EVENT_NAME={c.EVENT_NAME}
      EVENT_PLACE={c.EVENT_PLACE}
      EVENT_BEGIN_DATE={c.EVENT_BEGIN_DATE}
      EVENT_END_DATE={c.EVENT_END_DATE}
      VIEWS={c.VIEWS}
      DOWNLOADS={c.DOWNLOADS}
      HOST={c.EVENT_HOST}
      REGION={c.EVENT_REGION}
      ACCOUNT={c.EVENT_ACCOUNT}
    />
  ));
  
  return (
    <div className='box'>
    <div className='searchbox'>
      <form onSubmit={submitHandler} className="search">
        <input className="searchinput" onChange={searchHandler} ></input>
        <button type="submit" className="searchButton">검 색 <MdSearch style={{width: '25px'}}/></button>
      </form>
      <div>
      카테고리:
        <input type='button' onClick={searchevent} value='보안' ></input>
        <input type='button' onClick={searchevent} value='공모전' ></input>
      </div>
     </div>
        <div className="container">{card}</div>
        
    </div>
  );
};

export default Cards;