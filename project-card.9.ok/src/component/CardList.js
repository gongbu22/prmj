import { Card, Image } from 'semantic-ui-react'
import './CardModule.css';
import CardModal from './CardModal';
import CardFavourite from './CardFavourite';
import { MdOutlineFestival, MdPlace, MdCalendarToday } from "react-icons/md";
import moment from 'moment';
import Paging from './Paging';
 //semaintic-ui style적용
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = 
"https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

const CardExampleCard = (props) => {
  
  return(
  <Card key={props.EVENT_CODE} style={{margin: "30px"}} >
    <Image src='/images/avatar/large/matthew.png' wrapped ui={false} />
    <Card.Content>
      <Card.Meta>
        <div className='category'>{props.EVENT_CATEGORY}</div>
      </Card.Meta>
      <Card.Header>
        <MdOutlineFestival /><span className='name' style={{padding:"10px"}}>{props.EVENT_NAME}</span>
      </Card.Header>
      <Card.Meta>
        <MdPlace /><span className='place' style={{padding:"10px"}}>{props.EVENT_PLACE}</span>
      </Card.Meta>
      <Card.Description>
       <MdCalendarToday /> <span className='date' style={{padding:"10px"}}>{moment(props.EVENT_BEGIN_DATE).format('YYYY-MM-DD')} ~ {moment(props.EVENT_END_DATE).format('YYYY-MM-DD')}</span>
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
    <CardFavourite star={props.EVENT_CODE} />
     <span className='views'>{props.VIEWS}</span>
     <span className='downloads'>{props.DOWNLOADS}</span>
     <div id='hidden'>
       <span className='host'>{props.POST}</span>
       <span className='region'>{props.REGION}</span>
       <span className='account'>{props.ACCOUNT}</span>
     </div>
    </Card.Content>
    <CardModal code={props}/>
  </Card>
  )
}

export default CardExampleCard