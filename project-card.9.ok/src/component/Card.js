import axios from "axios";
import { useEffect, useState } from "react";
import CardList from "./CardList";
import './CardModule.css';
import { MdSearch } from "react-icons/md";



const Cards = () => {
  
 
  const [cards, setCards] = useState([]);
  const [temp, setSearch] = useState([]);

  useEffect(() => {
    axios.get("http://3.38.26.169:3001/cardList").then((res) => {
      // console.log(res)
      setCards(res.data);
    });
  }, []);

  const searchHandler = (s) => {
    s.preventDefault();
    setSearch(s.target.value);  //입력하는동안 움직임이 있으니깐 setSearch가 작동해서 temp 에 저장된다.
  };

  const submitHandler = (s) => {
    s.preventDefault();
    console.log(temp);

    let body = {
      searchName: temp,
    };

    axios.post("http://3.38.26.169:3001/cardSearch", body).then((res) => {
      setCards(res.data);
      console.log(res.data);
      //setCards(res.data);
      console.log(cards);
    });
  };
  
  const searchevent1 = (e) => {
     e.preventDefault();
    const eventName= e.target.value
    
    axios.get("http://3.38.26.169:3001/category1?event="+eventName).then((res) => {
    
      // setCards(res.data);
      // console.log(res.data)
    });
  }
  

  const card = cards.map((c) => (
    <CardList
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
      <input type='button' onSubmit={searchevent1} value='보안'></input>
     </div>
        <div className="container">{card}</div>
        
    </div>
  );
};

export default Cards;