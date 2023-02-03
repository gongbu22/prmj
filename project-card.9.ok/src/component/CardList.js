import { Card, Image } from 'semantic-ui-react'
import './CardModule.css';
import CardModal from './CardModal';
import CardFavourite from './CardFavourite';
import { MdOutlineFestival, MdPlace, MdCalendarToday } from "react-icons/md";
import moment from 'moment';
import Paging from './Paging';
import { useState, useEffect } from "react";
import axios from "axios";

 //semaintic-ui style적용
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = 
"https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

const CardExampleCard = () => {
  
  const [cards, setCards] = useState([]);
  
  const [count, setCount] = useState(0); // 아이템 총 개수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지. default 값으로 1
  const [postPerPage] = useState(5); // 한 페이지에 보여질 아이템 수 
  const [indexOfLastPost, setIndexOfLastPost] = useState(0); // 현재 페이지의 마지막 아이템 인덱스
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0); // 현재 페이지의 첫번째 아이템 인덱스
  const [currentPosts, setCurrentPosts] = useState(0); // 현재 페이지에서 보여지는 아이템들
  
   useEffect(() => {
    axios
      .get("http://3.38.26.169:3001/cardList")
      .then((res) => {
        setCards(res.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
    setCount(cards.length);
    setIndexOfLastPost(currentPage * postPerPage);
    setIndexOfFirstPost(indexOfLastPost - postPerPage);
    setCurrentPosts(cards.slice(indexOfFirstPost, indexOfLastPost)); 
    console.log(indexOfLastPost);
  }, [currentPage, indexOfLastPost, indexOfFirstPost, cards, postPerPage]);
  
  
  const setPage = (error) => {
    setCurrentPage(error);
  };
  
  return(
    <div style={{ marginBottom: 150 }}>
      {currentPosts && cards.length > 0 ? (
        currentPosts.map((card, idx) => (
          <Card key={idx} style={{margin: "30px"}} sx={{ minWidth: 275 }} variant="outlined" >
            <Image src='/images/avatar/large/matthew.png' wrapped ui={false} />
            <Card.Content>
              <Card.Meta>
                <div className='category'>{card.EVENT_CATEGORY}</div>
              </Card.Meta>
              <Card.Header>
                <MdOutlineFestival /><span className='name' style={{padding:"10px"}}>{card.EVENT_NAME}</span>
              </Card.Header>
              <Card.Meta>
                <MdPlace /><span className='place' style={{padding:"10px"}}>{card.EVENT_PLACE}</span>
              </Card.Meta>
              <Card.Description>
               <MdCalendarToday /> <span className='date' style={{padding:"10px"}}>{moment(card.EVENT_BEGIN_DATE).format('YYYY-MM-DD')} ~ {moment(card.EVENT_END_DATE).format('YYYY-MM-DD')}</span>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
            <CardFavourite star={card.EVENT_CODE} />
             <span className='views'>{card.VIEWS}</span>
             <span className='downloads'>{card.DOWNLOADS}</span>
             <div id='hidden'>
               <span className='host'>{card.POST}</span>
               <span className='region'>{card.REGION}</span>
               <span className='account'>{card.ACCOUNT}</span>
             </div>
            </Card.Content>
            <CardModal code={card}/>
          </Card>
        ))
      ) : (
        <div> No posts.</div>
      )}
      <Paging page={currentPage} count={count} setPage={setPage} />
      
    </div>
  )
}

export default CardExampleCard