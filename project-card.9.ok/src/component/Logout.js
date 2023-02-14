import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const [logoutStatus, setLogoutStatus] = useState("");
    const [Token, setToken] = useState("");
    const navigate = useNavigate();

    const logout = async() => {
      try{
      await axios.post("http://3.38.26.169:3001/logout", {
        headers: {
          'token': Token
        }
      }).then((res) => {
        console.log(res)
        setToken(res.data.TOKEN);
        localStorage.removeItem("USER");
      })
      document.location.href = '/'
        } catch(err) {
          console.log("err", err)
        }
      }

    return (
      <div>
        <button onClick={logout}> 로그아웃 </button>
      </div>
    );
}

export default Logout