import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import axios from 'axios';
import {useState, useEffect} from 'react';
import moment from 'moment';
import {MdCheckCircle, MdNotInterested} from 'react-icons/md';
import './ListModule.css';

function ModalExampleModal({admin}) {
  const [open, setOpen] = React.useState(false)
  
    //delete
   const listDelete=(e)=>{
        const star = e.target.name;
        
        
            axios.get("http://3.38.26.169:3001/adminDelete?star="+star).then((res) => {
                console.log(res.data)
                
            });

    } 
    
    //approve
    const approve = (e)=> {
      const approveStar = e.target.name;
      
      axios.get("http://3.38.26.169:3001/Approve?approveStar="+approveStar).then((res)=> {
        console.log(res.data)
      })
      
      alert("승인되었습니다.")
    }
    
    //noApprove
    const noApprove = (e)=> {
      const noApproveStar = e.target.name;
      
      axios.get("http://3.38.26.169:3001/noApprove?noApproveStar="+noApproveStar).then((res)=> {
        console.log(res.data)
      })
      
      alert("승인취소되었습니다.")
    }

  return (
     <div>
     
      <h1>전체목록</h1>
    <div>
        {admin.map((f)=> (
        <div>

    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
      <div className = 'list' >
      <div className= 'listTwo'>
        <div className='listCategory'><b>{f.EVENT_CATEGORY}</b></div>
        <div className='listName' ><h3>{f.EVENT_NAME}</h3> </div>
        <div>{f.RUBLIC==="YES" ? <p><MdCheckCircle />승인</p>:<p><MdNotInterested />승인요청중</p>}</div>
      </div>
      <Button style={{color:'white', background:'#A9DD54', width:'100px', height: '30px', float:'right', margin:'auto'}}> detail </Button>
      </div>}
    >
      <Modal.Header>{f.EVENT_NAME} 상세페이지</Modal.Header>
      <Modal.Content image>
        <Image size='medium' src='' wrapped />
        <Modal.Description>
          <Header>행사카테고리: {f.EVENT_CATEGORY}</Header>
          <p>행사이름: {f.EVENT_NAME}</p>
          <p>행사장소: {f.EVENT_PLACE}</p>
          <p>행사날짜: {moment(f.EVENT_BEGIN_DATE).format('YYYY-MM-DD')} ~ {moment(f.EVENT_END_DATE).format('YYYY-MM-DD')}</p>
          <p>행사설명: {f.EVENT_ACCOUNT}</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button style={{background:'#A9DD54', color: 'white'}} onClick={() => setOpen(false)}>
          닫기
        </Button>
      </Modal.Actions>
    </Modal>
    <input type='button' name={f.EVENT_CODE} value='삭제' onClick={listDelete}></input>
    <input type='button' name={f.EVENT_CODE} value={f.RUBLIC==="YES"? "승인취소": "승인하기"} onClick={f.RUBLIC==="YES"? noApprove: approve}></input>
    </div>
    ))}
    </div>
    </div>
  )
}

export default ModalExampleModal
