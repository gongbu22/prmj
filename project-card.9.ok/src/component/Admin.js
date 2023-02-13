import React from 'react'
import axios from 'axios';
import {useState, useEffect} from 'react';
import Pagination from './Pagination';
import AdminList from './AdminList'

function ModalExampleModal() {
  const [open, setOpen] = React.useState(false)
  
  const [admin, setAdmin] =useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  
  useEffect(() => {
        axios.get('http://3.38.26.169:3001/admin').then((res) => {
            setAdmin(res.data);
            console.log(admin);
            
        });  
    },'');
  
  /* 새로 추가한 부분 */
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = (admin) => {
    let currentPosts = 0;
    currentPosts = admin.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };
  
   //승인카테고리
  const approveHandler = (s) => {
    s.preventDefault();
    
    axios.get("http://3.38.26.169:3001/approveCategory").then((res) => {
      // console.log(res)
      setAdmin(res.data);
    });
  };
    

  return (
     <div>
     승인여부:  <input type="button" value="승인요청" onClick={approveHandler}></input>
      <AdminList admin={currentPosts(admin)}/>
      <div className="pagination">
        <Pagination 
          postsPerPage={postsPerPage}
          totalPosts={admin.length}
          paginate={setCurrentPage}
        />
      </div>
     </div>
  )
}

export default ModalExampleModal
