// import axios from 'axios';
// import {useState, useEffect} from 'react';

// const Favourite = () => {
    
//     const [favourite, setFavourite] =useState([]);
    
//     useEffect(() => {
//         axios.get('http://3.38.26.169:3001/favourite').then((res) => {
//             setFavourite(res.data)
//             console.log(favourite)
//         })  
//     })
    
//     return (
//         <div>
//             <h1>관심행사목록</h1>
//             {favourite.map((f)=> (
//                     <div className='userlist' key={f.EVENT_CODE}>
//                         <div>카테고리: {f.FAVOURITE_EVENT_CATEGORY}</div>
//                         <div>{f.EVENT_NAME}</div>
//                         <div>행사날짜:{f.FAVOURITE_EVENT_NAME}</div>
//                         <div>행사날짜: {f.EVENT_BEGIN_DATE} ~ {f.EVENT_END_DATE}</div>
                        
//                     </div>
//                 ))}
            
            
//         </div>
//     )
// }

// export default Favourite;


import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import axios from 'axios';
import {useState, useEffect} from 'react';

function ModalExampleModal() {
  const [open, setOpen] = React.useState(false)
  
  const [favourite, setFavourite] =useState([]);
  
  useEffect(() => {
        axios.get('http://3.38.26.169:3001/favourite').then((res) => {
            setFavourite(res.data)
            console.log(favourite)
        })  
    })
    
    
    

  return (
    <div>
        {favourite.map((f)=> (
    
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>
      <div>행사제목: {f.FAVOURITE_EVENT_NAME} </div>
      <p></p>
      <div>행사장소: {f.FAVOURITE_EVENT_PLACE} </div>
      </Button>}
    >
      <Modal.Header>Select a Photo</Modal.Header>
      <Modal.Content image>
        <Image size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' wrapped />
        <Modal.Description>
          <Header>Default Profile Image</Header>
          <p>
            We've found the following gravatar image associated with your e-mail
            address.
          </p>
          <p>Is it okay to use this photo?</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Nope
        </Button>
        <Button
          content="Yep, that's me"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
    ))}
    </div>
  )
}

export default ModalExampleModal
