import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import './CardModalModule.css';
import { MdOutlineHome, MdComputer, MdToday, MdOutlineUpdate, MdOutlineDescription, MdOutlineMouse,MdPerson } from 'react-icons/md';

function ModalExampleModal(code) {
  const [open, setOpen] = React.useState(false)
  const [count, setCount] = React.useState(0);
  
  
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button className="listbutton" style={{background: "linear-gradient(55.6deg, #A9DD54 0%, #56CDDD 88.09%)" , color:'white'}} >{code.code.EVENT_CODE}상세보기</Button>}
    >
      <Modal.Header>상세페이지</Modal.Header>
      <Modal.Content>
        <Modal.Description>
           <div className="carddetailPageBox">
             <ul className="carddetailPage">
              <li className="cardlist"><p className="c"></p><p className="carda"><b>{code.code.TYPE}</b></p><p className="cardb"></p></li>
                <li className="cardlist"><p className="c"><MdOutlineHome/></p><p className="carda">사이트명:</p> <p className="cardb">{code.code.WEBSITE_LIST}</p></li>
                <li className="cardlist"><p className="c"><MdComputer/></p><p className="carda">교육과정명:</p> <p className="cardb"> {code.code.COURSE_NAME}</p></li>
                <li className="cardlist"><p className="c"><MdOutlineUpdate /></p><p className="carda">과정일정: </p> <p className="cardb">{code.code.BEGIN_DATE}</p></li>
                <li className="cardlist"><p className="c"><MdToday /></p><p className="carda">수강기간: </p> <p className="cardb">{code.code.COURSE_DURATION}</p></li>
                <li className="cardlist"><p className="c"><MdOutlineDescription /></p><p className="carda">교육과정설명:</p> <p className="cardb bDESCRIPTION"> {code.code.DESCRIPTION}</p></li>
                <li className="cardlist cardurl"><p className="c"><MdOutlineMouse/></p><p className="carda">주소:</p> <p className="cardb"> <a href={code.code.WEBSITE}>{code.code.WEBSITE}</a></p></li>
                <li className="cardlist"><p className="c"><MdPerson/></p><p className="carda">작성자:</p> <p className="cardb"> {code.code.ID}</p></li>
            </ul>
        </div>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)} className="listbutton">
          닫기
        </Button>
        
      </Modal.Actions>
    </Modal>
  )
}

export default ModalExampleModal