import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import axios from 'axios';
import {useState, useEffect} from 'react';
import moment from 'moment';
import './ListModule.css';
import FavouriteList from './FavouriteList';
import Pagination from './Pagination';

function ModalExampleModal() {
  
  const [favourite, setFavourite] =useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(1);
  
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
    <Pagination 
        postsPerPage={postsPerPage}
        totalPosts={favourite.length}
        paginate={setCurrentPage}
      />
    </div>
  )
}

export default ModalExampleModal