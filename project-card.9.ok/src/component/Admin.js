import React from 'react'
import axios from 'axios';
import {useState, useEffect} from 'react';
import Pagination from './Pagination';
import AdminList from './AdminList'
import './ButtonModule.css';
import {useNavigate} from 'react-router-dom';

function ModalExampleModal() {
  
  const url = "http://54.180.178.89:3000/"
  
  const [open, setOpen] = React.useState(false)
  
  const [admin, setAdmin] =useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  
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
  
  let navigate = useNavigate();
  
   //승인카테고리
  const approveHandler = (s) => {
    s.preventDefault();
    
    axios.get("http://3.38.26.169:3001/approveCategory").then((res) => {
      // console.log(res)
      setAdmin(res.data);
    });
  };
  
  //전체카테고리
   const allHandler = (s) => {
     navigate("/admin")
    window.location.reload()
  };
    

  return (
     <div>
     승인여부:  <input type="button" value="승인요청" onClick={approveHandler} className="listbutton"></input>
      <input type="button" value="전체" onClick={allHandler} className="listbutton"></input>
     
     <button onClick={()=>{window.open(url)}}>크롤링실행</button>
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
