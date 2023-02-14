import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import axios from 'axios';
import {useState, useEffect} from 'react';
import moment from 'moment';
import FavouriteList from './FavouriteList';
import Pagination from './Pagination';
import {useNavigate} from 'react-router-dom';
import './ButtonModule.css';

function ModalExampleModal() {
  
  const [favourite, setFavourite] =useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9);
  
   let navigate = useNavigate();
  
  useEffect(() => {
        axios.get('http://3.38.26.169:3001/favourite').then((res) => {
            setFavourite(res.data);
            console.log(favourite);
            
        });  
    },'');
    
  
   /* 새로 추가한 부분 */
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = (favourite) => {
    let currentPosts = 0;
    currentPosts = favourite.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };
    

  return (
    <div>
    <FavouriteList favourite={currentPosts(favourite)}/>
    <p></p>
    <div className="pagination">
    <Pagination 
        postsPerPage={postsPerPage}
        totalPosts={favourite.length}
        paginate={setCurrentPage}
      />
    </div>
    </div>
  )
}

export default ModalExampleModal