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
    <div>
    {card.map((card)=> (
        <Card key={card.EVENT_CODE} style={{margin: "30px"}} >
        <Card.Content>
          <Card.Meta>
            <span className='category'>{card.EVENT_CATEGORY}</span>
          </Card.Meta>
          <Card.Header>
            <span className='name'>{card.EVENT_NAME}</span>
          </Card.Header>
          <Card.Meta>
            <span className='place'>{card.EVENT_PLACE}</span>
          </Card.Meta>
          <Card.Description>
            <span className='date'>{card.EVENT_BEGIN_DATE} ~ {card.EVENT_END_DATE}</span>
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
      ))}
      </div>
  )
}

export default CardExampleCard