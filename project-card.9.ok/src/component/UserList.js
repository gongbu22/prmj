import axios from 'axios';
import {useEffect, useState} from 'react';

const UserList =() => {
    const [lists, setLists] = useState([]);
    
    useEffect(() => {
        axios.get("http://3.38.26.169:3001/userList")
        .then((res) => {
            console.log(res.data);
           setLists(res.data); 
        });
    }, []);

    // const list = lists.map((lists) => (
        
    // ))
    
    return (
        <div>
            
        </div>
        );
};