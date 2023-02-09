import React, {useState} from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import moment from 'moment';
import {MdCheckCircle, MdNotInterested} from 'react-icons/md';
import './UserListModule.css';
import TestModal from './TestModal';

function ModalExampleModal({list}) {
  
  // 모달창 노출 여부 state
    const [modalOpen, setModalOpen] = useState(false);

    // 모달창 노출
    const showModal = () => {
        setModalOpen(true);
    };

  return (
     <div>
      <h1>추가한 목록</h1>
    <div>
        {list.map((f)=> (
        <div>
            <div>{f.WEBSITE_LIST}</div>
            <button onClick={showModal}>모달 띄우기</button>
            {modalOpen && <TestModal setModalOpen={setModalOpen} list={f.EDU_CODE} />}
        </div>

        ))}
    </div>
   </div> 
  );
};

export default ModalExampleModal
