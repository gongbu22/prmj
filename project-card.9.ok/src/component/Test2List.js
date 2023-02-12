import React, { useState } from 'react';
import TestDetail from './TestDetail';
import {useNavigate} from 'react-router-dom';

function App({list}) {
  
  const navigate = useNavigate();
 
  const changeTestDetail = (e) => {
     const star = e.target.value
    navigate("/testdetail");
  };
    

  return (
      <div>
       {list.map((f)=> (
           <div>
                <div key={f.EDU_CODE} >
                    <h1>{f.EDU_CODE}디테일이양</h1>
                    <button size="large" onClick={changeTestDetail} value={f.EDU_CODE}>구매하기</button>
                </div>
           
            </div>
     ))}
     </div>
  );
}

export default App;