import { useEffect, useState} from 'react';
import UserAdd from './UserAdd';
import UserList from './UserList';
import axios from 'axios';

function User() {
    const [lists, setLists] = useState([]);
   
   useEffect(() => {
    axios.get("http://3.38.26.169:3001/userList").then((res) => {
       console.log(res)
      setLists(res.data);
    });
  }, []);
    
    return (
        <div>
            <UserAdd />
            <UserList list={lists}/>
        </div>
    )
}

export default User;