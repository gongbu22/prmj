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

const Nav =()=> {
    
    const activeStyle = {
      color: '#A9DD54',
      textDecoration: 'underline'
    }
    const deactiveStyle = {
      color: 'black',
      textDecoration: 'none'
    }
    
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
  
          
          
          <li>
          <NavLink to="/favourite" style={({isActive}) => {
            return isActive ? activeStyle : deactiveStyle;
          }}><h5>Favourite</h5></NavLink>
          </li>
          
          <li>
          <NavLink to="/admin" style={({isActive}) => {
            return isActive ? activeStyle : deactiveStyle;
          }}><h5>Admin</h5></NavLink>
          </li>
          
          <li>
          <NavLink to="/login" style={({isActive}) => {
            return isActive ? activeStyle : deactiveStyle;
          }}><h5>Login</h5></NavLink>
          </li>
          
           
          
        </ul>
        <hr />
        <Routes>
          <Route exact path="/" element={<Card />}></Route>
          <Route path="/user" element={<User />}></Route>
         
          <Route path="/favourite" element={<Favourite />}></Route>
          <Route path="/favouriteDetail" element={<FavouriteDetail />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/adminDetail" element={<AdminDetail />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/userUpdate" element={<UserUpdate />}></Route>
          <Route path="/userAdd" element={<UserAdd />}></Route>
          <Route path="/userDetail" element={<UserDetail />}></Route>
        </Routes>
      </div>
    )
    
}

export default Nav;