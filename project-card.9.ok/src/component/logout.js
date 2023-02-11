import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const [logoutStatus, setLogoutStatus] = useState("");
    const [token, setToken] = useState("");
    const navigate = useNavigate();

    const logout = () => {
      axios.post("http://3.38.26.169:3001/logout", {
        headers: {
          'token': token
        }
      }).then((response) => {
        console.log(response)
        setToken(response.data.TOKEN);
        localStorage.removeItem("USER");
        if(response.data.message){
          setLogoutStatus(response.data.message);
        }else{
          setLogoutStatus(response.data.email);
        }
      });
      navigate("/login");
    }

    return (
      <div>
        <button onClick={logout}> 로그아웃 </button>
      </div>
    );
}

export default Logout