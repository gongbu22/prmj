import axios from "axios";
import { useState, useEffect } from "react";
import CardList from "./CardList";
import './CardModule.css';
import { MdSearch } from "react-icons/md";
import Paging from './Paging';



const Cards = () => {
  
 
  const [cards, setCards] = useState([]);
  const [temp, setSearch] = useState([]);
  
  const [count, setCount] = useState(0); // 아이템 총 개수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지. default 값으로 1
  const [postPerPage] = useState(5); // 한 페이지에 보여질 아이템 수 
  const [indexOfLastPost, setIndexOfLastPost] = useState(0); // 현재 페이지의 마지막 아이템 인덱스
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0); // 현재 페이지의 첫번째 아이템 인덱스
  const [currentPosts, setCurrentPosts] = useState(0); // 현재 페이지에서 보여지는 아이템들

  
  //보여줄 포스트
  useEffect(()=>{
    
    axios.get("http://3.38.26.169:3001/cardList").then((res) => {
      // console.log(res)
      setCards(res.data);
    });
    
    setCount(cards.length);
    setIndexOfLastPost(currentPage * postPerPage);
    setIndexOfFirstPost(indexOfLastPost - postPerPage);
    setCurrentPosts(cards.slice(indexOfFirstPost, indexOfLastPost));
  }, [currentPage, indexOfLastPost, indexOfFirstPost, cards, postPerPage]);

  const setPage = (error) => {
    setCurrentPage(error);
  };

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
      <div>
        {currentPosts && cards.length > 0 ? (
        <div className="container">{card}</div>
        ) : (
        <div> No posts.</div>
        )}
         <Paging page={currentPage} count={count} setPage={setPage} />
      </div>  
    </div>
  );
};

export default Cards;