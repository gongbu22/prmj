import axios from "axios";
import { useEffect, useState } from "react";
import CardList from "./CardList";
import './CardModule.css';
import Pagination from './Pagination';



const Cards = () => {
  
 
  const [cards, setCards] = useState([]);
  const [temp, setSearch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);
  

  useEffect(() => {
    axios.get("http://3.38.26.169:3001/cardList").then((res) => {
      // console.log(res)
      setCards(res.data);
    });
  }, []);

  //카테고리
   //메가스터디
  const megaHandler = (s) => {
    s.preventDefault();
    
    axios.get("http://3.38.26.169:3001/megastudy").then((res) => {
      // console.log(res)
      setCards(res.data);
    });
  };
    //IT뱅크
  const itbankHandler = (s) => {
    s.preventDefault();
    
    axios.get("http://3.38.26.169:3001/itbank").then((res) => {
      // console.log(res)
      setCards(res.data);
    });
  };
  
   //평일반
  const weekHandler = (s) => {
    s.preventDefault();
    
    axios.get("http://3.38.26.169:3001/week").then((res) => {
      // console.log(res)
      setCards(res.data);
    });
  };
  
   //주말반
  const weekendHandler = (s) => {
    s.preventDefault();
    
    axios.get("http://3.38.26.169:3001/weekend").then((res) => {
      // console.log(res)
      setCards(res.data);
    });
  };
  
  
  
  
//검색

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
  
  /* 새로 추가한 부분 페이징 */
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = (cards) => {
    let currentPosts = 0;
    currentPosts = cards.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };
  

  
  return (
    <div>
    <div>
      <form onSubmit={submitHandler} className="search">
        <input className="searchinput" onChange={searchHandler} ></input>
        <button type="submit" className="searchButton">검색</button>
      </form>
      사이트명: <input type="button" value="메가스터디" onClick={megaHandler}></input>
      <input type="button" value="IT뱅크" onClick={itbankHandler}></input>
      
      수강일정: <input type="button" value="평일반" onClick={weekHandler}></input>
      <input type="button" value="주말반" onClick={weekendHandler}></input>
     </div>
     <div className="bigCard">
      <div className="cardList">
        <CardList card={currentPosts(cards)}/>
      </div>
        <div className="pagination">
          <Pagination 
          postsPerPage={postsPerPage}
          totalPosts={cards.length}
          paginate={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Cards;