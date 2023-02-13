import React, {useState, useEffect} from "react";
import "./RegisterModule.css";
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom';

function Register(){

  const navigate = useNavigate("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");

  const token = localStorage.getItem('token');

    const register = async (e) => {
    e.preventDefault();
    try{
    const response = await axios.post("http://3.38.26.169:3001/register", {
      email: email,
      id: id,
      password: password,
    }).then((response) => {
      if (response.status === 400) {
        setRegisterStatus(response.data.message);
      } else if (response.data.message) {
        setRegisterStatus(response.data.message);
      } else {
        setRegisterStatus("계정이 생성되었습니다.");
      }
    })
    document.location.href = '/login' 
    } catch(err) {
        console.log("err", err)
    }
  }

  return(
    <div className="registerForm">
    <form>
        <h2 className="regiWelcome"> 회원가입 </h2>
        <label htmlFor="email" className="regiLabel"> 이메일 </label>
        <input className="regiInput" type="text" name="email" onChange={(e) => {setEmail(e.target.value)}} placeholder="이메일을 입력하세요 " required />
        <label htmlFor="username" className="regiLabel"> 아이디 </label>
        <input className="regiInput" type="username" name="username" onChange={(e) => {setId(e.target.value)}} placeholder="아이디를 입력하세요 " required />
        <label htmlFor="password" className="regiLabel"> 비밀번호 </label>
        <input className="regiInput" type="password" name="password" onChange={(e) => {setPassword(e.target.value)}} placeholder="비밀번호를 입력하세요 " required />
        <input className="regiButton" type="submit" onClick={register} value=" 회원가입 " />
        <h1 style={{fontSize: '15px', textAlign: 'center', marginTop: '20px'}}>{registerStatus}</h1>
    </form>
    </div>
  );
}

export default Register;