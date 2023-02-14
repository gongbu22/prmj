import React, {useState} from "react";
import "./LoginModule.css";
import Axios from "axios";
import { NavLink, useNavigate } from 'react-router-dom';
// import { Modal, Button } from 'react-bootstrap';

const Login = () => {

    const navigate = useNavigate("");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const [loginStatus, setLoginStatus] = useState("");

    const login = async(e) => {
      e.preventDefault();
      try{
      const response = await Axios.post("http://3.38.26.169:3001/login",
        {
          id: id,
          password: password
        })
        .then((res) => {
          console.log(res.data)
          localStorage.setItem('USER', JSON.stringify({
            "ID": res.data.ID, 
            "User_grade": res.data.USER_GRADE,
            "TOKEN": res.data.TOKEN
          }))
        })
        .catch((err) => {
          console.error(err);
        });
        document.location.href = '/'
      } catch(err) {
        console.log("err", err)
    }
    };
    
    return(
       <div className="container">
        <div className="logForm">
          <form>
            <h4> KIEP </h4>
            <input className="logIdInput" type="text" name="username" onChange={(e) => {setId(e.target.value)}} placeholder="아이디를 입력하세요" required />
            <input className="logPwInput" type="password" name="password" onChange={(e) => {setPassword(e.target.value)}} placeholder="비밀번호를 입력하세요" required />
            <input className="logButton" type="submit" onClick={login} value="로그인" />
            <h1 style={{color: 'red', fontSize: '15px', textAlign: 'center', marginTop: '5px'}}>{loginStatus}</h1>
            <h1 style={{color: 'red', fontSize: '15px', textAlign: 'center', marginTop: '5px'}}>{token}</h1>
          </form>
        </div>
      </div>
    );
}

export default Login;