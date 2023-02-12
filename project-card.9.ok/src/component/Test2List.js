import React, { useState } from 'react';
import TestDetail from './TestDetail';
import {Link} from 'react-router-dom';

function App({list}) {
  
  
    

  return (
      <div>
       {list.map((f)=> (
           <div>
                <div key={f.EDU_CODE} >
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
                    <h1>{f.EDU_CODE}디테일이양</h1>
                </Link>
                </div>
           
            </div>
     ))}
     </div>
  );
}

export default App;