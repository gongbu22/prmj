import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import axios from 'axios';
import {useState, useEffect} from 'react';
import moment from 'moment';
import {MdCheckCircle, MdNotInterested} from 'react-icons/md';
import './ListModule.css';

function FavouriteList({favourite}) {
  const [open, setOpen] = React.useState(false)

  const submit=(e)=>{
        const star = e.target.name;
        
            axios.get("http://3.38.26.169:3001/favouriteDelete?star="+star ).then((res) => {
                console.log(res.data)
                
            });
    }
    
  return (
    <div>
        {favourite.map((f)=> (
    <div>
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
      <div className = 'list' >
      <div className= 'listTwo'>
        <div className='listCategory'><b>{f.FAVOURITE_EVENT_CATEGORY}</b></div>
        <div className='listName' ><h3>{f.FAVOURITE_EVENT_NAME}</h3> </div>
      </div>
      <Button style={{color:'white', background:'#A9DD54', width:'100px', height: '30px', float:'right', margin:'auto'}}> detail </Button>
      </div>}
    >
      <Modal.Header>{f.FAVOURITE_EVENT_NAME} 상세페이지</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Header>행사카테고리: {f.FAVOURITE_EVENT_CATEGORY}</Header>
          <p>행사이름: {f.FAVOURITE_EVENT_NAME}</p>
          <p>행사장소: {f.FAVOURITE_EVENT_PLACE}</p>
          <p>행사날짜: {moment(f.FAVOURITE_EVENT_BEGIN_DATE).format('YYYY-MM-DD')} ~ {moment(f.FAVOURITE_EVENT_END_DATE).format('YYYY-MM-DD')}</p>
          <p>행사설명: {f.EVENT_ACCOUNT}</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button style={{background:'#A9DD54', color: 'white'}} onClick={() => setOpen(false)}>
          닫기
        </Button>
      </Modal.Actions>
    </Modal>
     <input type='button' value='관심행사삭제' name={f.FAVOURITE_EVENT_CODE} onClick={submit} style={{float: 'right'}}></input>
    </div>
    ))}
    </div>
  )
}

export default FavouriteList