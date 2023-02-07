import { useEffect, useState} from 'react';
import UserAdd from './UserAdd';
import UserList from './UserList';
import axios from 'axios';
import Pagination from './Pagination';

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
            <UserAdd />
            <UserList list={currentPosts(lists)}/>
            <Pagination 
            postsPerPage={postsPerPage}
            totalPosts={lists.length}
            paginate={setCurrentPage}
            />
        </div>
    )
}

export default User;