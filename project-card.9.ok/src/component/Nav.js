import Card from './Card';
// import AddEvent from './component/AddEvent';
import MyPage from './MyPage';
import Favourite from './Favourite';
import {Routes, Route, NavLink} from 'react-router-dom';
import Admin from './Admin';
import Login from './Login';
import User from './User';
import UserUpdate from './UserUpdate'
import UserAdd from './UserAdd'
import UserDetail from './UserDetail'
import FavouriteDetail from './FavouriteDetail'
import AdminDetail from './AdminDetail'
import Register from './Register'
import Logout from './Logout';

//logout
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const Nav =()=> {
    
    const activeStyle = {
      color: '#A9DD54',
      textDecoration: 'underline'
    }
    const deactiveStyle = {
      color: 'black',
      textDecoration: 'none'
    }
    
  const token = JSON.parse(localStorage.getItem("USER"));
  const isAdmin = token && token.User_grade === 2;
  const isMember = token !==null && token.User_grade === 1 ;
  const isAuthenticated = token !== null;
  const notMember = token == null;
  
  //logout
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
      alert("로그아웃되었습니다.")
      document.location.href = '/'
        } catch(err) {
          console.log("err", err)
        }
      }


  
    return (
        <div>
         <ul id='nav' style={{margintop:'20px'}}> 
          <li><NavLink to="/" style={({isActive}) => {
            return isActive ? activeStyle : deactiveStyle;
          }}><h5>IT교육과정</h5></NavLink>
          </li>
          
         {isAuthenticated && (
          <li>
          <NavLink to="/user" style={({isActive}) => {
            return isActive ? activeStyle : deactiveStyle;
          }}><h5>교육과정등록</h5></NavLink>
          </li>
       )}
          
          
         {isAuthenticated && (
        <li>
        <NavLink to="/favourite" style={({isActive}) => {
          return isActive ? activeStyle : deactiveStyle;
        }}><h5> 내관심과정</h5></NavLink>
        </li>
        )}

          
          {isAdmin && (
        <li>
          <NavLink to="/admin" style={({isActive}) => {
            return isActive ? activeStyle : deactiveStyle;
          }}><h5> 관리자 </h5></NavLink>
        </li>
        )}

          
          
        {isAuthenticated? <button onClick={logout} style={{background:"transparent", border:"none", cursor:"pointer"}}> <h5>로그아웃</h5> </button>:<li>
          <NavLink to="/login" style={({isActive}) => {
            return isActive ? activeStyle : deactiveStyle;
          }}><h5>로그인</h5></NavLink>
          </li>
        }

        
         {notMember &&
        <li>
        <NavLink to="/register" style={({isActive}) => {
          return isActive ? activeStyle : deactiveStyle;
        }}><h5> 회원가입 </h5></NavLink>
        </li>
        }
        
         {isMember && (
        <li>
          <NavLink to='/mypage' style={({isActive}) => {
            return isActive ? activeStyle : deactiveStyle;
          }}><h5>회원탈퇴</h5></NavLink> 
        </li>
        )}
          
          
        </ul>
        <hr />
        <Routes>
          <Route exact path="/" element={<Card />}></Route>
          <Route path="/user" element={<User />}></Route>
         
          <Route path="/favourite" element={<Favourite />}></Route>
          <Route path="/favouriteDetail" element={<FavouriteDetail />}></Route>
           {isAdmin && (<Route path="/admin" element={<Admin />}></Route>)}

          <Route path="/adminDetail" element={<AdminDetail />}></Route>
           {notMember && (<Route path="/login" element={<Login />}></Route>)}
        {isAuthenticated && (<Route path="/logout" element={<Logout />}></Route>)}

          <Route path="/register" element={<Register/>}></Route>
          <Route path="/mypage" element={<MyPage/>}></Route>
          <Route path="/userUpdate" element={<UserUpdate />}></Route>
          <Route path="/userAdd" element={<UserAdd />}></Route>
          <Route path="/userDetail" element={<UserDetail />}></Route>
        </Routes>
      </div>
    )
    
}

export default Nav;

// {notMember && (<Route path="/login" element={<Login />}></Route>)}

// <li>
//           <NavLink to={isAuthenticated ? "/logout" : "/login"} style={({isActive}) => {
//           return isActive ? activeStyle : deactiveStyle;
//           }}><h5>{isAuthenticated ? "Logout" : "Login"}</h5></NavLink>
//         </li>