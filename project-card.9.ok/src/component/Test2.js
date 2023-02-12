import { useEffect, useState} from 'react';
import TestList from './Test2List';
import axios from 'axios';
import Pagination from './Pagination';
import TestAdd from './TestAdd';
import TestDetail from './TestDetail'

function User() {
    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(3);
    
   
   useEffect(() => {
    axios.get("http://3.38.26.169:3001/userList").then((res) => {
       console.log(res)
      setLists(res.data);
    });
  }, []);
  
  /* 새로 추가한 부분 */
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = (lists) => {
    let currentPosts = 0;
    currentPosts = lists.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };
  
  
    
    return (
        <div>
            <TestAdd />
            <TestList list={currentPosts(lists)}/>
            
            <div className="pagination">
                <Pagination 
                postsPerPage={postsPerPage}
                totalPosts={lists.length}
                paginate={setCurrentPage}
                />
            </div>
        </div>
    )
}

export default User;