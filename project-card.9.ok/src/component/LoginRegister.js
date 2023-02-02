import React, {useState, useEffect} from "react";
import "./LoginRegister.css";
import Axios from "axios";
import {Link, useNavigate} from 'react-router-dom';

function Register(){

  const navigate = useNavigate("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");

  const token = localStorage.getItem('token');
  console.log(token)


  const register = (e) => {
    e.preventDefault();
    Axios.post("http://3.38.26.169:3001/register", {
      email: email,
      id: id,
      password: password,
    }).then((response) => {
      // setRegisterStatus(response);
      // console.log(response);
      if(response.data.message){
        setRegisterStatus(response.data.message);
      }else{
        setRegisterStatus("계정이 생성되었습니다.");
      }
    })
    
    navigate('/Login');
  }

  return(
    <div className="loginForm">
    <form>
        <h4> Register </h4>
        <label htmlFor="email"> 이메일 </label>
        <input className="textInput" type="text" name="email" onChange={(e) => {setEmail(e.target.value)}} placeholder="이메일을 입력하세요 " required />
        <label htmlFor="username"> 아이디 </label>
        <input className="textInput" type="username" name="username" onChange={(e) => {setId(e.target.value)}} placeholder="아이디를 입력하세요 " required />
        <label htmlFor="password"> 비밀번호 </label>
        <input className="textInput" type="password" name="password" onChange={(e) => {setPassword(e.target.value)}} placeholder="비밀번호를 입력하세요 " required />
        <input className="button" type="submit" onClick={register} value=" 회원가입 " />
        <h1 style={{fontSize: '15px', textAlign: 'center', marginTop: '20px'}}>{registerStatus}</h1>
    </form>
    </div>
  );
}

export default Register;