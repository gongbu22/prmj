import React from 'react';
import './ModalBasicModule.css';
import axios from 'axios';
import { useEffect, useState} from 'react';

const Modal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;
  const [code, setCode] = useState([]);
  
  
//   axios.get("http://3.38.26.169:3001/test?code="+list).then((res) => {
//       console.log(res)
//       setCode(res.data);
//     });

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
       <div>
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          팝업창입니다. 쉽게 만들 수 있어요. 같이 만들어봐요!
          </header>
          <main>{props.children}</main>
          <footer>
            <button className="close" onClick={close}>
              close
            </button>
          </footer>
        </section>
      ) : null}
    </div>
      </div>
  );
};

export default Modal