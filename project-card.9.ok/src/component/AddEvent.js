import React from 'react'
import { Button, Image, Modal } from 'semantic-ui-react'
import './AddEventModule.css'
import axios from "axios";

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = 
"https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

function ModalExampleContentImage() {
  const [open, setOpen] = React.useState(false)
  const [name, setName] = React.useState("");
  const [place, setPlace] = React.useState("");
  const [host, setHost] = React.useState("");
  
  const nameHandler = (e) => {
      e.preventDefault();
      setName(e.target.value);
  }
  
  const placeHandler = (e) => {
      e.preventDefault();
      setPlace(e.target.value);
  }
  
  const hostHandler = (e)=> {
      e.preventDefault();
      setHost(e.target.value);
  }
  
  const submitHandler =(s) => {
      s.preventDafault();
      
      let body = {
          Name: name,
          Place: place,
          Host: host,
      };
      
      axios.post("http://3.38.26.169:3001/add", body)
        .then((res) => console.log(res));
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button className='addbutton'>행사추가하기</Button>}
    >
      <Modal.Header>Upload image</Modal.Header>
      <form onSubmit={submitHandler}>
      <Modal.Content image>
        <Image size='medium' src='https://react.semantic-ui.com/images/wireframe/image-square.png' wrapped />
        <Modal.Description>
          <label>행사이름: </label>
          <input value={name} className='name' onChange={nameHandler}></input>
          <label>행사장소: </label>
          <input value={place} className='place' onChange={placeHandler}></input>
          <label>행사주최: </label>
          <input value={host} className='host' onChange={hostHandler}></input>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button tyle="submit" onClick={() => setOpen(false)} positive>
          Ok
        </Button>
      </Modal.Actions>
      </form>
    </Modal>
  )
}

export default ModalExampleContentImage