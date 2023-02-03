import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import axios from 'axios';
import {useState, useEffect} from 'react';
import moment from 'moment';
import './FavouriteModule.css';
import FavouriteDelete from './FavouriteDelete';

function ModalExampleModal() {
  const [open, setOpen] = React.useState(false)
  
  const [favourite, setFavourite] =useState([]);
  
  useEffect(() => {
        axios.get('http://3.38.26.169:3001/favourite').then((res) => {
            setFavourite(res.data);
            console.log(favourite);
            
        });  
    },'');
    
    
    

  return (
    <div>
        {favourite.map((f)=> (
    
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
      <div className = 'favouriteList' >
      <div className= 'favouriteTwo'>
        <div className='favouriteCategory'><b>{f.FAVOURITE_EVENT_CATEGORY}</b></div>
        <div className='favouriteName' ><h3>{f.FAVOURITE_EVENT_NAME}</h3> </div>
      </div>
      <Button style={{color:'white', background:'#A9DD54', width:'100px', height: '30px', float:'right', margin:'auto'}}> detail </Button>
      </div>}
    >
      <Modal.Header>{f.FAVOURITE_EVENT_NAME} 상세페이지</Modal.Header>
      <Modal.Content image>
        <Image size='medium' src='' wrapped />
        <Modal.Description>
          <Header>행사카테고리: {f.FAVOURITE_EVENT_CATEGORY}</Header>
          <p>행사이름: {f.FAVOURITE_EVENT_NAME}</p>
          <p>행사장소: {f.FAVOURITE_EVENT_PLACE}</p>
          <p>행사날짜: {moment(f.FAVOURITE_EVENT_BEGIN_DATE).format('YYYY-MM-DD')} ~ {moment(f.FAVOURITE_EVENT_END_DATE).format('YYYY-MM-DD')}</p>
          <p>행사설명: {f.EVENT_ACCOUNT}</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
      <FavouriteDelete star={f.FAVOURITE_EVENT_CODE}/>
        <Button style={{background:'#A9DD54', color: 'white'}} onClick={() => setOpen(false)}>
          닫기
        </Button>
      </Modal.Actions>
    </Modal>
    ))}
    </div>
  )
}

export default ModalExampleModal