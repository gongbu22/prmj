import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import './CardModalModule.css';

function ModalExampleModal(code) {
  const [open, setOpen] = React.useState(false)
  const [count, setCount] = React.useState(0);
  
  const handleClick = () => {
    setCount(count + 1);
  };
  
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button onClick={handleClick}  style={{background: "linear-gradient(55.6deg, #A9DD54 0%, #56CDDD 88.09%)" , color:'white'}} >{code.code.EVENT_CODE}상세보기</Button>}
    >
      <Modal.Header>{code.code.EDU_CODE}상세페이지</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>사이트명: {code.code.WEBSITE_LIST}  </Header>
          <p>교육과정명:  {code.code.COURSE_NAME}</p>
          <p>교육과정수업날: {code.code.BEGIN_DATE}</p>
          <p>교육과정기간: {code.code.COURSE_DURATION}</p>
          <p>교육과정설명: {code.code.DESCRIPTION}</p>
          <p>사이트주소: {code.code.WEBSITE}</p>
          <p>사이트주소를 클릭하면 해당사이트로 이동합니다.</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          닫기
        </Button>
        
      </Modal.Actions>
    </Modal>
  )
}

export default ModalExampleModal