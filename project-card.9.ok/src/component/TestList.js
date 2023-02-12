import React, {useState} from 'react'

function ModalExampleModal({list}) {
  
  //아코디언
  const [isActive, setIsActive] = useState(false);
  

  return (
     <div>
     <div>
        {list.map((f)=> (
        <div>
            <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
                <p>사이트명: {f.WEBSITE_LIST}</p>
                <p>교육과정명: {f.COURSE_NAME}</p>
                <div>{isActive ? '-' : '+'}</div>
            </div>
            {isActive && <div className="accordion-content">
                
                <p>교육과정수업날: {f.BEGIN_DATE}</p>
                <p>교육과정기간: {f.COURSE_DURATION}</p>
                <p>교육과정설명: {f.DESCRIPTION}</p>
                <p>사이트주소: {f.WEBSITE}</p>
                <p>주소를 클릭하면 해당사이트로 이동합니다.</p>
            </div>}
        </div>
   ))}
   </div>
   </div>

    );
};

export default ModalExampleModal
