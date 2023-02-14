import { useEffect, useState} from 'react';
import UserList from './UserList';
import axios from 'axios';
import Pagination from './Pagination';
import {Link, useNavigate} from 'react-router-dom';
import './ButtonModule.css';
import './UserModule.css';

function User() {
    const [lists, setLists] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(9);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("USER"));

    
   
   useEffect(() => {
       if (!user) {
            alert("로그인하셔야 이용이 가능하십니다.");
            document.location.href = '/login'
       } else {
            axios.get("http://3.38.26.169:3001/userList?ID="+user.ID).then((res) => {
               console.log(res)
              setLists(res.data);
            });
       }
  }, [navigate]);
  
  console.log(user.ID)
  
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
            
            <UserList list={currentPosts(lists)}/>
            <div>
                <Link to={"/userAdd"} state={{
                    id:user.ID,
                    }}>
                    <button className="userAddButton">교육과정 추가하기</button>
                </Link>
            </div>
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