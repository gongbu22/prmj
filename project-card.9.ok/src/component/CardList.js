import { Card, Image } from 'semantic-ui-react'
import './CardModule.css';
import CardModal from './CardModal'
import CardFavourite from './CardFavourite';

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = 
"https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

const CardExampleCard = ({card}) => {
  
  return(

    <div className="card">
    {card.map((card)=> (
    <div>
        <Card key={card.EDU_CODE} style={{margin: "30px"}} >
        <Card.Content>
          <Card.Meta>
            <span className='websiteList'>사이트명: {card.WEBSITE_LIST}</span>
          </Card.Meta>
          <Card.Header>
            <span className='courseName'>교육과정명: {card.COURSE_NAME}</span>
          </Card.Header>
          <Card.Meta>
            <span className='beginDate'>교육과정수업날: {card.BEGIN_DATE}</span>
          </Card.Meta>
          <Card.Description>
            <span className='courseDuration'>교육과정수업기간:{card.COURSE_DURATION}</span>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
        <CardFavourite star={card.EDU_CODE} />
        </Card.Content>
        <CardModal code={card}/>
      </Card>
       <div id='hidden'>
           <span className='host'>{card.DESCRIPTION}</span>
           <span className='region'>{card.WEBSITE}</span>
        </div>
        </div>
      ))}
      </div>
  )
}

export default CardExampleCard