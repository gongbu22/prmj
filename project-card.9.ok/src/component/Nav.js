import Card from './Card';
// import AddEvent from './component/AddEvent';
import User from './User';
import About from './/About';
import Favourite from './Favourite';
import {Routes, Route, NavLink} from 'react-router-dom';

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
          <NavLink to="/about" style={({isActive}) => {
            return isActive ? activeStyle : deactiveStyle;
          }}>About</NavLink>
          </li>
          
          <li>
          <NavLink to="/favourite" style={({isActive}) => {
            return isActive ? activeStyle : deactiveStyle;
          }}>favourite</NavLink>
          </li>
          
        </ul>
        <hr />
        <Routes>
          <Route exact path="/" element={<Card />}></Route>
          <Route path="/user" element={<User />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/favourite" element={<Favourite />}></Route>
        </Routes>
      </div>
    )
    
}

export default Nav;