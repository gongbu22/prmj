import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import axios from 'axios';
import {useState, useEffect} from 'react';
import moment from 'moment';
import {MdCheckCircle, MdNotInterested} from 'react-icons/md';
import {useNavigate} from 'react-router-dom';
import './AdminListModule.css';

function ModalExampleModal({admin}) {
  const [open, setOpen] = React.useState(false)
  let navigate = useNavigate();
  
    //delete
   const listDelete=(e)=>{
        const star = e.target.name;
        
        
            axios.get("http://3.38.26.169:3001/adminDelete?star="+star).then((res) => {
                console.log(res.data)
                
            });
      alert("삭제되었습니다.")
      
      navigate("/admin")
      window.location.reload()

    } 
    
    //approve
    const approve = (e)=> {
      const approveStar = e.target.name;
      
      axios.get("http://3.38.26.169:3001/Approve?approveStar="+approveStar).then((res)=> {
        console.log(res.data)
      })
      
      alert("승인되었습니다.")
      
      navigate("/admin")
      window.location.reload() // 새로고침 내장함수 추가!
    }
    
    //noApprove
    const noApprove = (e)=> {
      const noApproveStar = e.target.name;
      
      axios.get("http://3.38.26.169:3001/noApprove?noApproveStar="+noApproveStar).then((res)=> {
        console.log(res.data)
      })
      
      alert("승인취소되었습니다.")
      
      navigate("/admin")
      window.location.reload() // 새로고침 내장함수 추가!
    }

  return (
     <div>
     
      <h1>전체목록</h1>
    <div className="bigBox">
        {admin.map((f)=> (
        <div>

    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
      <div className = 'list' >
      <div className= 'listTwo'>
        <div className='listCategory'><b>{f.WEBSITE_LIST}</b></div>
        <div className='listName' ><h3>{f.COURSE_NAME}</h3> </div>
        <div>{f.PUBLICITY==="YES" ? <p><MdCheckCircle />승인</p>:<p><MdNotInterested />승인요청중</p>}</div>
      </div>
      <Button style={{color:'white', background:'#A9DD54', width:'100px', height: '30px', float:'right', margin:'auto'}}> detail </Button>
      </div>}
    >
      <Modal.Header>{f.COURSE_NAME} 상세페이지</Modal.Header>
      <Modal.Content image>
        <Image size='medium' src='' wrapped />
        <Modal.Description>
          <Header>사이트명: {f.WEBSITE_LIST}</Header>
          <p>교육과정명: {f.COURSE_NAME}</p>
          <p>교육과정 수업날: {f.BEGIN_DATE}</p>
          <p>교육과정기간: {f.COURSE_DURATION}</p>
          <p>교육과정설명: {f.DESCRIPTION}</p>
          <p>사이트주소: {f.WEBSITE}</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button style={{background:'#A9DD54', color: 'white'}} onClick={() => setOpen(false)}>
          닫기
        </Button>
      </Modal.Actions>
    </Modal>
    <input type='button' name={f.EDU_CODE} value='삭제' onClick={listDelete}></input>
    <input type='button' name={f.EDU_CODE} value={f.PUBLICITY==="YES"? "승인취소": "승인하기"} onClick={f.PUBLICITY==="YES"? noApprove: approve}></input>
    </div>
    ))}
    </div>
    </div>
  )
}

export default ModalExampleModal
