import React, { useState } from 'react';
import TestDetail from './TestDetail';
import {Link} from 'react-router-dom';

function App({list}) {
  
  
    

  return (
      <div>
       {list.map((f)=> (
           <div>
                <div key={f.EDU_CODE} >
                    <p>{f.WEBSITE_LIST}</p>
                    <p>{f.COURSE_NAME}</p>
                    <p>{f.COURSE_DURATION}</p>
                    <p>{f.ID}</p>
                    <Link to={"/testdetail"} state={{
                    EDU_CODE: f.EDU_CODE,
                    WEBSITE_LIST: f.WEBSITE_LIST,
                    COURSE_NAME: f.COURSE_NAME,
                    BEGIN_DATE: f.BEGIN_DATE,
                    COURSE_DURATION: f.COURSE_DURATION,
                    DESCRIPTION:f.DESCRIPTION,
                    WEBSITE:f.WEBSITE,
                    ID:f.ID
                    }}>
                    <button>상세보기</button>
                    </Link>
                </div>
           
            </div>
     ))}
     </div>
  );
}

export default App;