import styles from'./App.css';
import Card from './component/Card';
// import AddEvent from './component/AddEvent';
import User from './component/User';
import About from './component/About';
import {Routes, Route, NavLink} from 'react-router-dom';

const activeStyle = {
  color: '#A9DD54',
  textDecoration: 'underline'
}
const deactiveStyle = {
  color: 'black',
  textDecoration: 'none'
}

function App() {
  return (
    <div>
       <ul id='nav'> 
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
      </ul>
      <hr />
      <Routes>
        <Route path="/" element={<Card />}></Route>
        <Route path="/user" element={<User />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
    </div>

  );
}

export default App;
