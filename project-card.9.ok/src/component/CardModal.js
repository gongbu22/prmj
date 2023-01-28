import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

function ModalExampleModal(code) {
  const [open, setOpen] = React.useState(false)
  
  
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>{code.code.EVENT_CODE}상세보기</Button>}
    >
      <Modal.Header>{code.code.HOST}상세페이지</Modal.Header>
      <Modal.Content image>
        <Image size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' wrapped />
        <Modal.Description>
          <Header>카테고리: {code.code.EVENT_CATEGORY}  </Header>
          <p>공연 이름:  {code.code.EVENT_NAME}</p>
          <p>진행날짜: {code.code.EVENT_BEGIN_DATE} ~ {code.code.EVENT_END_DATE}</p>
          <p>장소: {code.code.EVENT_PLACE}</p>
          <p>지역: {code.code.REGION}</p>
          <p>주최: {code.code.HOST}</p>
          <p>설명: {code.code.ACCOUNT}</p>
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