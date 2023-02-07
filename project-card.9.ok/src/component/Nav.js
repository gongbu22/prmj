import Card from './Card';
// import AddEvent from './component/AddEvent';
import User from './User';
import MyPage from './MyPage';
import Favourite from './Favourite';
import {Routes, Route, NavLink} from 'react-router-dom';
import Admin from './Admin';
import Login from './Login';

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
          }}>Card</NavLink>
          </li>
          
          <li>
          <NavLink to="/user" style={({isActive}) => {
            return isActive ? activeStyle : deactiveStyle;
          }}>User</NavLink>
          </li>
  
          
          
          <li>
          <NavLink to="/favourite" style={({isActive}) => {
            return isActive ? activeStyle : deactiveStyle;
          }}>favourite</NavLink>
          </li>
          
          <li>
          <NavLink to="/admin" style={({isActive}) => {
            return isActive ? activeStyle : deactiveStyle;
          }}>admin</NavLink>
          </li>
          
          <li>
          <NavLink to="/login" style={({isActive}) => {
            return isActive ? activeStyle : deactiveStyle;
          }}>login</NavLink>
          </li>
          
           
          
        </ul>
        <hr />
        <Routes>
          <Route exact path="/" element={<Card />}></Route>
          <Route path="/user" element={<User />}></Route>
         
          <Route path="/favourite" element={<Favourite />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>
    )
    
}

export default Nav;