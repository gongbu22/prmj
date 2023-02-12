import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const [logoutStatus, setLogoutStatus] = useState("");
    const [token, setToken] = useState("");
    const navigate = useNavigate();

    const logout = () => {
      axios.post("http://localhost:3001/logout", {
        headers: {
          'token': token
        }
      }).then((res) => {
        console.log(res)
        setToken(res.data.TOKEN);
        localStorage.removeItem("USER");
      })
      document.location.href = '/'
      }

    return (
      <div>
        <button onClick={logout}> 로그아웃 </button>
      </div>
    );
}

export default Logout