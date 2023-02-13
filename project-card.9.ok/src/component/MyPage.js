import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./MypageModule.css";
import axios from 'axios';

function MyPage() {

    const navigate = useNavigate("");
    const [deleteStatus, setDeleteStatus] = useState("");
    const goBack = () => {
        navigate('/');
    }
    const deleteAccount = async(del) => {
    del.preventDefault();
    try{
    const id = JSON.parse(localStorage.getItem("USER")).id;
      
    axios.delete("http://3.38.26.169:3001/mypage", { data: { id } }).then((response) => {
            if (response.status === 200) {
                alert("회원 탈퇴가 완료되었습니다.");
                localStorage.removeItem('USER');
                localStorage.clear()
                document.location.href = '/';
            } else {
                alert("회원 탈퇴에 실패했습니다.");
            }
        });
    } catch(err) {
        console.log("err", err)
    }
    }
  
    return (
        <div className="delForm">
        <form>
            <h2 className="delTitle"> 회원탈퇴 </h2>
            <p className="delDescription"> 회원탈퇴를 하시면 모든 개인정보가 삭제되며 복구가 불가능합니다. </p>
            <input className="backButton" type="submit" onClick={goBack} value="뒤로가기"></input>
            <input className="delButton" type="submit" onClick={deleteAccount} value=" 회원탈퇴"></input>
            <h1 style={{fontSize: '15px', textAlign: 'center', marginTop: '20px'}}>{deleteStatus}</h1>
        </form>
        </div>
    );
}

export default MyPage