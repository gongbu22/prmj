import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import axios from 'axios';
import {useState} from 'react';
import moment from 'moment';
import {MdCheckCircle, MdNotInterested} from 'react-icons/md';
import {useNavigate} from 'react-router-dom';
import './FavouriteListModule.css';

function FavouriteList({favourite}) {
  const [open, setOpen] = React.useState(false)
  let navigate = useNavigate();

  const submit=(e)=>{
        const star = e.target.name;
        
            axios.get("http://3.38.26.169:3001/favouriteDelete?star="+star ).then((res) => {
                console.log(res.data)
                
            });
            
        alert("관심행사가 삭제되었습니다.")
      
      navigate("/favourite")
      window.location.reload()
    }
    
  return (
    <div className="bigBox">
        {favourite.map((f)=> (
    <div className="box">
    <div className="modal">
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
      <div className = 'list' >
      <div className= 'listTwo'>
        <div className='listCategory'><b>{f.WEBSITE_LIST}</b></div>
        <div className='listName' ><h3>{f.COURSE_NAME}</h3> </div>
      </div>
      <Button style={{color:'white', background:'#A9DD54', width:'100px', height: '30px', float:'right', margin:'auto'}}> detail </Button>
      </div>}
    >
      <Modal.Header>{f.FCOURSE_CODE} 상세페이지</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Header>사이트명: {f.WEBSITE_LIST}</Header>
          <p>교육과정명: {f.COURSE_NAME}</p>
          <p>교육과정수업날: {f.BEGIN_DATE}</p>
          <p>교육과정기간: {f.COURSE_DURATION}</p>
          <p>교육과정설명: {f.DESCRIPTION}</p>
          <p>사이트주소: {f.WEBSITE}</p>
          <p>**사이트주소를 클릭하면 해당사이트로 이동됩니다.</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button style={{background:'#A9DD54', color: 'white'}} onClick={() => setOpen(false)}>
          닫기
        </Button>
      </Modal.Actions>
    </Modal>
    </div>
    <div className="fdelete">
     <input id="favouriteDelete" type='button' value='삭제' name={f.FCOURSE_CODE} onClick={submit} style={{float: 'right'}}></input>
    </div>
    </div>
    ))}
    </div>
  )
}

export default FavouriteList