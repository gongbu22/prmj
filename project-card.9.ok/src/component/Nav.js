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
  const isAuthenticated = token !== null && token.User_grade === 1;
  const notMember = token == null;
    
    return (
        <div>
         <ul id='nav' style={{margintop:'20px'}}> 
          <li><NavLink to="/" style={({isActive}) => {
            return isActive ? activeStyle : deactiveStyle;
          }}><h5>Card</h5></NavLink>
          </li>
          
          <li>
          <NavLink to="/user" style={({isActive}) => {
            return isActive ? activeStyle : deactiveStyle;
          }}><h5>User</h5></NavLink>
          </li>
  
          
          
          {isAuthenticated && (
        <li>
        <NavLink to="/favourite" style={({isActive}) => {
          return isActive ? activeStyle : deactiveStyle;
        }}><h5> FAVOURITE </h5></NavLink>
        </li>
        )}
          
          {isAdmin && (
        <li>
          <NavLink to="/admin" style={({isActive}) => {
            return isActive ? activeStyle : deactiveStyle;
          }}><h5> 관리자 </h5></NavLink>
        </li>
        )}
        
        {isAuthenticated && (
        <li>
          <NavLink to='/mypage' style={({isActive}) => {
            return isActive ? activeStyle : deactiveStyle;
          }}><h5>MyPage</h5></NavLink> 
        </li>
        )}
          
          <li>
          <NavLink to={isAuthenticated ? "/logout" : "/login"} style={({isActive}) => {
          return isActive ? activeStyle : deactiveStyle;
          }}><h5>{isAuthenticated ? "Logout" : "Login"}</h5></NavLink>
        </li>
        
         {notMember &&
        <li>
        <NavLink to="/register" style={({isActive}) => {
          return isActive ? activeStyle : deactiveStyle;
        }}><h5> Register </h5></NavLink>
        </li>
        }
          
          
        </ul>
        <hr />
        <Routes>
          <Route exact path="/" element={<Card />}></Route>
          <Route path="/user" element={<User />}></Route>
         
          <Route path="/favourite" element={<Favourite />}></Route>
          <Route path="/favouriteDetail" element={<FavouriteDetail />}></Route>
           {isAdmin && (
          <Route path="/admin" element={<Admin />}></Route>
        )}
          <Route path="/adminDetail" element={<AdminDetail />}></Route>
          <Route path={isAuthenticated ? "/logout" : "/login"} element={isAuthenticated ? <Logout /> : <Login />}></Route>
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