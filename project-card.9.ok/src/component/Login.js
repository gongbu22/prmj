import React, {useState} from "react";
import "./login.css";
import Axios from "axios";
import { NavLink, useNavigate } from 'react-router-dom';
// import { Modal, Button } from 'react-bootstrap';

const Login = () => {

    const navigate = useNavigate("");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const [loginStatus, setLoginStatus] = useState("");

    const login = (e) => {
      e.preventDefault();
      Axios.post("http://3.38.26.169:3001/login",
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
        navigate("/");
    };
    
    
  
    return(
      <div className="container">
        <div className="loginForm">
          <form>
            <h4> 로그인 하기 </h4>
            <label htmlFor="username"> 아이디 </label>
            <input className="textInput" type="text" name="username" onChange={(e) => {setId(e.target.value)}} placeholder="아이디를 입력하세요" required />
            <label htmlFor="password"> 비밀번호 </label>
            <input className="textInput" type="password" name="password" onChange={(e) => {setPassword(e.target.value)}} placeholder="비밀번호를 입력하세요" required />
            <input className="button" type="submit" onClick={login} value="Login" />
            <h1 style={{color: 'red', fontSize: '15px', textAlign: 'center', marginTop: '5px'}}>{loginStatus}</h1>
            <h1 style={{color: 'red', fontSize: '15px', textAlign: 'center', marginTop: '5px'}}>{token}</h1>
            <NavLink to="/register" style={{color: 'Blue', fontSize: '15px', textAlign: 'center', marginTop: '5px', }}> 회원가입하기 </NavLink>
          </form>
        </div>
      </div>
    );
  }

export default Login;