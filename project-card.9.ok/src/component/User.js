import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserAdd from './UserAdd';
import UserList from './UserList';
import axios from 'axios';
import Pagination from './Pagination';

function User() {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);
  const navigate = useNavigate();

//   useEffect(() => {
//       const token = JSON.parse(localStorage.getItem("USER"));
//       const id = token.ID
//       console.log(id)
//       if (!token) {
//           navigate("/login");
//       } else {
//         axios.get("http://3.38.26.169:3001/userList").then((res) => {
//             console.log(res)
//             setLists(res.data);
//         });
//       }
//   }, []);
  axios.get("http://3.38.26.169:3001/userList").then((res) => {
            console.log(res)
            setLists(res.data);
        });


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