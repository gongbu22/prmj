import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import moment from 'moment';
import {MdCheckCircle, MdNotInterested} from 'react-icons/md';
import './UserListModule.css';

function ModalExampleModal({list}) {
  const [open, setOpen] = React.useState(false)

  return (
     <div>
      <h1>추가한 목록</h1>
    <div>
        {list.map((f)=> (
  
    <Modal 
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
      <div className = 'list' >
      <div className= 'listTwo'>
        <div className='listCategory' key={f.EDU_CODE}><b>사이트명:{f.WEBSITE_LIST}</b></div>
        <div className='listName' ><h3>교육과정명:{f.COURSE_NAME}</h3> </div>
        <div>{f.PUBLICITY==="YES" ? <p><MdCheckCircle />승인</p>:<p><MdNotInterested />승인요청중</p>}</div>
      </div>
      <Button style={{color:'white', background:'#A9DD54', width:'100px', height: '30px', float:'right', margin:'auto'}}> detail </Button>
      </div>}
    >
      <Modal.Header>{f.EDU_CODE} 상세페이지</Modal.Header>
        <Modal.Description>
          <Header>사이트명: {f.WEBSITE_LIST}</Header>
          <p>교육과정명: {f.COURSE_NAME}</p>
          <p>교육과정수업날: {f.BEGIN_DATE}</p>
          <p>교육과정기간: {f.COURSE_DURATION}</p>
          <p>교육과정설명: {f.DESCRIPTION}</p>
          <p>사이트주소: {f.WEBSITE}</p>
          <p>주소를 클릭하면 해당사이트로 이동합니다.</p>
        </Modal.Description>
      <Modal.Actions>
        <Button style={{background:'#A9DD54', color: 'white'}} onClick={() => setOpen(false)}>
          닫기
        </Button>
      </Modal.Actions>
    </Modal>


    ))}

    </div>
    </div>
  )
}

export default ModalExampleModal
