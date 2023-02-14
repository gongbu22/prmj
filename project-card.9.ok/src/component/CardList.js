import { Card, Image } from 'semantic-ui-react'
import './CardModule.css';
import CardModal from './CardModal'
import CardFavourite from './CardFavourite';
import { MdOutlineHome, MdComputer, MdToday, MdOutlineUpdate, MdOutlineDescription, MdOutlineMouse,MdPerson } from 'react-icons/md';

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = 
"https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

const CardExampleCard = ({card}) => {
  const user = JSON.parse(localStorage.getItem("USER"));
  
  return(

    <div className="card">
    {card.map((card)=> (
    <div className="dd">
        <Card key={card.EDU_CODE} style={{margin: "30px"}} >
        <Card.Content>
          <Card.Meta>
          </Card.Meta>
          <Card.Header>
          </Card.Header>
          <Card.Meta>
          </Card.Meta>
          <Card.Description>
            <ul className="carddetailPage">
                <li className="cardlist"><p className="b"><MdComputer/>       <b>{card.COURSE_NAME}</b></p></li>
                <li className="cardlist"><p className="b"><MdOutlineHome/>        {card.WEBSITE_LIST}</p></li>
                <li className="cardlist"><p className="b"><MdToday/>        {card.BEGIN_DATE}</p></li>
                <li className="cardlist"><p className="b"><MdOutlineUpdate/>      {card.COURSE_DURATION}</p></li>
            </ul>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
        <CardFavourite star={card.EDU_CODE} websiteList={card.WEBSITE_LIST} courseName={card.COURSE_NAME}/>
        </Card.Content>
        <CardModal code={card}/>
      </Card>
        </div>
      ))}
      </div>
  )
}

export default CardExampleCard

// <CardFavourite star={card.EDU_CODE} />
// <CardModal code={card}/>