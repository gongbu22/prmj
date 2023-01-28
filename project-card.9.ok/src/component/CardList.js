import { Card, Image } from 'semantic-ui-react'
import './CardModule.css';
import CardModal from './CardModal'

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = 
"https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

const CardExampleCard = (props) => (
  <Card key={props.EVENT_CODE} style={{margin: "30px"}} >
    <Image src='/images/avatar/large/matthew.png' wrapped ui={false} />
    <Card.Content>
      <Card.Meta>
        <span className='category'>{props.EVENT_CATEGORY}</span>
      </Card.Meta>
      <Card.Header>
        <span className='name'>{props.EVENT_NAME}</span>
      </Card.Header>
      <Card.Meta>
        <span className='place'>{props.EVENT_PLACE}</span>
      </Card.Meta>
      <Card.Description>
        <span className='date'>{props.EVENT_BEGIN_DATE} ~ {props.EVENT_END_DATE}</span>
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
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

export default CardExampleCard